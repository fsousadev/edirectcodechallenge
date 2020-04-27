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

  upsert(entity: Project): Observable<Project> {
    if (entity._id != null) {
      return this.create(entity);
    } else {
      return this.update(entity);
    }
  }

  create(entity: Project): Observable<Project> {
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let headers = { headers: httpHeaders };

    return this.http.post<Project>(`${environment.apiURL}/${this.serviceEndpoint}`, JSON.stringify(entity), headers).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  update(entity: Project): Observable<Project> {
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let headers = { headers: httpHeaders };

    return this.http.put<Project>(`${environment.apiURL}/${this.serviceEndpoint}/${entity._id}`, JSON.stringify(entity), headers).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }


}

