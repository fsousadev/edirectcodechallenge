import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private serviceEndpoint: string = `Tasks`;

  constructor(
    private http: HttpClient
  ) { }

  upsert(entity: Task): Observable<Task> {
    if (entity._id != null) {
      return this.create(entity);
    } else {
      return this.update(entity);
    }
  }

  create(entity: Task): Observable<Task> {
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let headers = { headers: httpHeaders };

    return this.http.post<Task>(`${environment.apiURL}/${this.serviceEndpoint}`, JSON.stringify(entity), headers).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  update(entity: Task): Observable<Task> {
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let headers = { headers: httpHeaders };

    return this.http.put<Task>(`${environment.apiURL}/${this.serviceEndpoint}/${entity._id}`, JSON.stringify(entity), headers).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
