import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  public signup(userCredentials: User): Promise<any> {
    return this.http.post<any>("users/signup", userCredentials).toPromise();
  }
  public signin(userCredentials: User): Promise<any> {
    return this.http.post<any>("users/signup", userCredentials).toPromise();
  }
}