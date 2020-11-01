import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardPageService {
  // SERVER_URL: string = "http://localhost:5000/api/upload-documents/"; 
  constructor(private http: HttpClient) { 
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  }  
  // public upload(formData) {
  //  debugger;
  //   return this.http.post<any>(this.SERVER_URL, formData, {  
  //       reportProgress: true,  
  //       observe: 'events'  
  //     });  
  // }

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
