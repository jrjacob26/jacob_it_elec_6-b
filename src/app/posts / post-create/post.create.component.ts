import { Component } from '@angular/core';

@Component({
  selector: 'post-create',
  templateUrl: './post.create.component.html',
  styleUrls: ['./post.create.component.css']
})
export class PostCreateComponent {

  NewPost = 'This is the initial post.';
  enteredValue = '';

  onAddPost(){
    this.NewPost = this.enteredValue;
  }

}
