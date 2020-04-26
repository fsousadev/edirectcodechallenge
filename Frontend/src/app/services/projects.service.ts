import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Project } from '../models/project';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private serviceEndpoint: string = `Projects`;

  constructor(
    private http: HttpClient
  ) { }

  getByUserId(userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.apiURL}/${this.serviceEndpoint}`)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            return of(null);
          } else {
            return throwError(error);
          }
        })
      )
  }
}

