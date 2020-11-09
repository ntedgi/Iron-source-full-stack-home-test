import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../interfaces';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {
  }


  public updateUserData(nickName: string): void {
    sessionStorage.setItem('nick-name', nickName);
    sessionStorage.setItem('logged-in', 'true');
  }

  public signup(userCredentials: User): Promise<any> {
    return this.http.post<any>('/api/users/signup', userCredentials).toPromise();
  }

  public signIn(userCredentials: User): Promise<any> {
    return this.http.post<any>('/api/users/sign-in', userCredentials).toPromise();
  }
}
