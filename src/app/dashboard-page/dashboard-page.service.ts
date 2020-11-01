import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardPageService {

  constructor(private http: HttpClient) { 
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  }  
  uploadFile( ): Observable<any> {
    return this.http.post('http://localhost:5000/api/upload-documents',this.httpOptions)
    // .pipe(
    //   retry(1),
    //   catchError(this.handleError)
    // )
  }

  public getOcrProcessed(statudId:number): Observable<any> {
    
     return this.http.get(`http://localhost:5000/api/ocr/${statudId}`);
 }
 public getOcrUnProcessed(statudId:number): Observable<any> {
    
  return this.http.get(`http://localhost:5000/api/ocr/${statudId}`);
}
public getOcrFinalized(statudId:number): Observable<any> {
    
  return this.http.get(`http://localhost:5000/api/ocr/${statudId}`);
}
public getOcrInprogress(statudId:number): Observable<any> {
    
  return this.http.get(`http://localhost:5000/api/ocr/${statudId}`);
}
 public getOcrAll(): Observable<any> {
    
  return this.http.get(`http://localhost:5000/api/ocr`);
}
}
