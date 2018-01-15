import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

// import { UserService } from './user.service';

@Injectable()
export class ApiService {

  private baseUrl = "http://localhost:8000/api/";

  constructor(
    private http:HttpClient,
    // private uService:UserService,
    private router:Router
  ) { }

  fetchGet(url:string, callback: Function, options?:{}) {
    this.http.get(this.baseUrl + url, options).subscribe(data => {
      callback(data)
    });
  }

  fetchPost(url:string, body:any, callback: Function, options?:{}) {
    this.http.post(this.baseUrl + url, body, options).subscribe(data => {
      callback(data)
    });
  }

}
