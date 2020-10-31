import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DetailsOcrService {
  apiURL = 'http://localhost:5000';

  constructor(private http:HttpClient) { }
  
  getEmployee(id): Observable<any> {
    return this.http.get(this.apiURL + '/api/ocr' + id)
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
