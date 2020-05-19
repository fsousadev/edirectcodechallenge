import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Auth } from '../models/user';
import * as jwt_decode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
//import sha256 from 'crypto-js/sha256';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serviceEndpoint: string = `Users`;
  private tokenKey = '_nuke';

  private state;

  constructor(
    private http: HttpClient
  ) {
    this.state = this.getRandomString(5);
  }

  private getRandomString(size: number) {
    return Math.random().toString(36).substring(size);
  }

  getAuthServerUrl() {
    return `${environment.authserver.authority}/connect/authorize?response_type=code&state=${this.state}&client_id=js&scope=${environment.authserver.scopes[0]}&redirect_uri=${environment.authserver.callback}`;
  }

  requestAcessToken(code: string, state: string): Observable<any> {
    console.log(this.state, state);

    //if (this.state == state) {
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let headers = { headers: httpHeaders };
    let body = new URLSearchParams();
    body.set("client_id", 'js');
    body.set("grant_type", "authorization_code");
    body.set("code", code);
    body.set("redirect_uri", environment.authserver.callback);

    return this.http.post<any>(`${environment.authserver.authority}/connect/token`, body.toString(), headers).pipe(
      tap(res => {
        this.setToken(res.access_token);

        const decoded = jwt_decode(res.access_token);
        this.setName(`${decoded.Identifier}`)
      }),
      catchError(error => {
        return throwError(error);
      })
    );
    //} else {
    //  return throwError('State doesnt match');
    //}
  }

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
