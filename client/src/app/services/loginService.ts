import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  public signup(userCredentials: User): Promise<any> {
    return this.http.post<any>('/api/users/signup', userCredentials).toPromise();
  }
  public signIn(userCredentials: User): Promise<any> {
    return this.http.post<any>('/api/users/signin', userCredentials).toPromise();
  }
}
