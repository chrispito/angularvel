import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { switchMap, map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";

// import { UserService } from './user.service';

@Injectable()
export class ApiService {
  private baseUrl = "http://localhost:8000/api/";

  constructor(
    private http: HttpClient,
    // private uService:UserService,
    private router: Router
  ) {}

  fetchGet(url: string, callback: Function, options?: {}) {
    return this.http
      .get(this.baseUrl + url, options)
      .pipe(
        catchError((error: any) => Observable.throw(error.json()))
      );
  }
  // fetchGet(url:string, callback: Function, options?:{}) {
  //   this.http.get(this.baseUrl + url, options).subscribe(data => {
  //     callback(data)
  //   });
  // }

  // fetchPost(url: string, body: any, callback: Function, options?: {}) {
  //   this.http.post(this.baseUrl + url, body, options).subscribe(data => {
  //     callback(data);
  //   });
  // }

  fetchPost(url: string, body: any, callback: Function, options?: {}) {
    this.http
    .post(this.baseUrl + url, body, options)
    .pipe(
      catchError((error: any) => Observable.throw(error.json))
    );
  }
}
