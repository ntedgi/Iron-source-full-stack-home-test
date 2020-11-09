import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    const nickName = sessionStorage.getItem('nick-name');
    if (nickName === null) {
      this.router.navigateByUrl('/');
    }
    return true;
  }
}

