import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  constructor() { }


  userType:string;

  setUserType(name){
    if(name=="John Smith"){
      this.userType='admin'
    }
    else{
      this.userType='User'
    }
  }
  getUserType(){
    return this.userType
  }
}