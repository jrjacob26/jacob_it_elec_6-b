const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

mongoose.connect("mongodb+srv://christopher26:jacob092602@cluster0.t7a79.mongodb.net/JACOB?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Connection Failed:', err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save()
        .then(createdPost => {
            res.status(201).json({
                message: 'Post added successfully',
                postId: createdPost._id
            });
        })
        .catch(err => {
            res.status(500).json({ message: 'Creating post failed!', error: err });
        });
});

app.get("/api/posts", (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Posts successfully fetched',
                posts: documents
            });
        })
        .catch(err => {
            res.status(500).json({ message: 'Fetching posts failed!', error: err });
        });
});

app.delete("/api/posts/:id", async (req, res, next) => {
    try {
        const result = await Post.findByIdAndDelete(req.params.id);
        
        if (!result) {
            return res.status(404).json({ message: "Post not found!" });
        }
        
        console.log("Deleted Post:", result);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).json({ message: "Deleting post failed!", error: err });
    }
});

module.exports = app;
