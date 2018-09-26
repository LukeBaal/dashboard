import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  user = {
    email: '',
    avatar: '',
    displayName: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.user = {
          email: auth.email,
          avatar: auth.photoURL,
          displayName: auth.displayName
        };
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
