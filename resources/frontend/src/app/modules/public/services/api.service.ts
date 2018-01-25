import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { switchMap, map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";

@Injectable()
export class ApiService {
  private baseUrl = "http://localhost:8000/api/";

  constructor(private http: HttpClient, private router: Router) {}

  fetchGet(url: string, callback: Function, options?: {}) {
    return this.http
      .get(this.baseUrl + url, options)
      .pipe(catchError((error: any) => Observable.throw(error.json)));
  }

  fetchPost(url: string, body: any, callback: Function, options?: {}) {
    let bodyTosend = {
      ...body,
      name: body["firstname"] + ", " + body["lastname"]
    };
    return this.http
      .post(this.baseUrl + url, bodyTosend, options)
      .pipe(catchError((error: any) => Observable.throw(error.json)));
  }
}
