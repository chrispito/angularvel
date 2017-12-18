import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { UserService } from './user.service';

@Injectable()
export class ApiService {

  private baseUrl = "http://localhost:8000/api/";

  constructor(
    private http:HttpClient,
    private uService:UserService
  ) { }

  registerUser(userData) {
    // const headers = new Headers();
    // headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + 'register', userData).subscribe(data => {
      console.log("data = ", data);
    });
  }

  loginUser(userData) {
    console.log("Log User2 = ", userData);
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Bearer ' + this.uService.getUserToken());
    // var options = {headers}
    return this.http.post(this.baseUrl + 'authenticate', userData)
    .subscribe(data => {
      this.uService.setUserLoggedIn(data)
    });
  }

}
