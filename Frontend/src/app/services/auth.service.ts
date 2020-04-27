import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Auth } from '../models/user';
import * as jwt_decode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serviceEndpoint: string = `Users`;
  private tokenKey = '_nuke';

  constructor(
    private http: HttpClient
  ) { }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  sigin(entity: User): Observable<Auth> {
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let headers = { headers: httpHeaders };

    return this.http.post<Auth>(`${environment.apiURL}/${this.serviceEndpoint}/signin`, JSON.stringify(entity), headers).pipe(
      tap(res => {
        this.setToken(res.meta.token);
        this.setName(`${res.item.firstname} ${res.item.lastname}`)
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  sigup(entity: User): Observable<Auth> {
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let headers = { headers: httpHeaders };

    return this.http.post<Auth>(`${environment.apiURL}/${this.serviceEndpoint}/signup`, JSON.stringify(entity), headers).pipe(
      tap(res => {
        this.setToken(res.meta.token);
        this.setName(`${res.item.firstname} ${res.item.lastname}`)
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  logout() {
    this.deleteToken();
    this.deleteName();
  }

  private deleteToken() {
    localStorage.removeItem(this.tokenKey);
  }

  private deleteName() {
    localStorage.removeItem('_name');
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  getName() {
    return localStorage.getItem('_name');
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setName(name: string): void {
    localStorage.setItem('_name', name);
  }

  private getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }


}
