import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DetailsOcrService {
  apiURL = 'http://localhost:5000';
  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  getEmployee(id): Observable<any> {
    return this.http.get(this.apiURL + `/api/invoice/${id}`);
    // .pipe(
    //   retry(1),
    //   catchError(this.handleError)
    // )
  }  
  updateEmployee( employee): Observable<any> {
    return this.http.post(this.apiURL + '/api/invoice/edit', employee,this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
