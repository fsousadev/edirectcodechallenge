import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isTokenExpired()) {
      this.router.navigateByUrl('/auth');
    }

    let token = this.authService.getToken();
    if (!request.url.includes('Users') && token) {
      request = request.clone({
        headers: request.headers
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
      });
    }

    return next.handle(request);
  }
}
