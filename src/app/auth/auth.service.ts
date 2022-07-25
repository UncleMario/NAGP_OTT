import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userIsLoggedIn = false;
  adminIsLoggedIn = false;
  userHasPrime = false;
  adminHasPrime = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(userName: string, password: string): Observable<boolean> {
    if(userName == "user" && password == "user"){
      return of(true).pipe(
        tap(() => this.userIsLoggedIn = true)
      );
    }
    if(userName == "admin" && password == "admin"){
      return of(true).pipe(
        tap(() => this.adminIsLoggedIn = true)
      );
    }

    return of(true);
  }

  logout(): void {
    this.userIsLoggedIn = false;
    this.adminIsLoggedIn = false;
  }

  getPrime(): void {
    if(this.userIsLoggedIn){
      this.userHasPrime = true;
    }
    else if(this.adminIsLoggedIn){
      this.adminHasPrime = true;
    }
  }

  hasPrime(): boolean{
    if(this.adminIsLoggedIn && this.adminHasPrime){
      return true;
    }
    else if(this.userIsLoggedIn && this.userHasPrime){
      return true;
    }

    return false;
  }
}
