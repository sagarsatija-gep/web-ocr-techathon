import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardPageService {

  constructor(private http: HttpClient) { }
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
