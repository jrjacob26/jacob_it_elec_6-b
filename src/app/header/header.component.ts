import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'; // ✅ Needed for managing subscription
import { AuthService } from '../authentication/auth.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription; 

  isDarkMode = false; // Added for theme toggle

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Initialize authentication status
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    // Optional: Load saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-theme');
    } else {
      this.isDarkMode = false;
      document.body.classList.add('light-theme');
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  onLogout() {
    this.authService.logout(); // ✅ Call logout method
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe(); 
  }
}
