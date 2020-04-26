import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYTQzYjg4NThiNTg4NGM3MGFiZjk1YyIsImlhdCI6MTU4NzgzOTA4MywiZXhwIjoxNTg3OTI1NDgzfQ.rLZ-FM66u2_AAIPUu6fTKa6SXt4607zbMzRShesCoeU')
        .set('Content-Type', 'application/json')
    });
    return next.handle(request);
  }
}
