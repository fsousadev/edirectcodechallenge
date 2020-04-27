import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  user: User = new User();
  registerMode: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    if (!this.authService.isTokenExpired()) {
      this.router.navigateByUrl('/projects');
    }
    this.user.email = 'fsousadev@gmail.com';
    this.user.password = '123456Aa';
  }

  register() {
    this.registerMode = !this.registerMode;
  }

  connect() {
    if (this.registerMode) {
      this.authService.sigup(this.user).subscribe(res => {
        this._snackBar.open("Your account was created with sucess!", "X", {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.router.navigateByUrl('/projects');
      }, err => {
        this._snackBar.open("Error creating your account!", "X", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      });
    } else {
      this.authService.sigin(this.user).subscribe(res => {
        this._snackBar.open("You logged in with success!", "X", {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.router.navigateByUrl('/projects');
      }, err => {
        this._snackBar.open("Error loggin in!", "X", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      });
    }
  }

  IsFormValid() {
    let invalid: boolean = !this.user.email || !this.user.password;
    if (this.registerMode) {
      invalid = invalid || !this.user.firstname || !this.user.lastname;
    }
    return !invalid;
  }

}
