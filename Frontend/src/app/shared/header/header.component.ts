import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {

  name: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngDoCheck() {
    this.name = this.authService.getName();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}
