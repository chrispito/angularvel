import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  private baseUrl = "http://localhost:8000/api/";

  constructor(
    private http:Http
  ) { }

  registerUser(userData) {
    console.log("Reg User2 = ", userData);
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + 'register', userData, {headers: headers}).map(res => res.json());
  }

}
