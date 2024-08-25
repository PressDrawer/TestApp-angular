import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  urlregister = "https://localhost:7057/api/Auth/Register";
  urllogin = "https://localhost:7057/api/Auth/login"
  public registerUser(user : User):Observable<any>{
    debugger;
    return this.http.post<any>(this.urlregister,user);
  }

  public login(login:User):Observable<any>{
    debugger;
    return this.http.post(this.urllogin,login);
  }
}
