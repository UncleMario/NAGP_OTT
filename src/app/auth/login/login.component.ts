import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public authService: AuthService, public router: Router) {
  }

  login(userName: string, password: string) {

    this.authService.login(userName, password).subscribe(() => {
      if (this.authService.userIsLoggedIn) {
          this.router.navigate(["/home"]);
      }
      if(this.authService.adminIsLoggedIn){
        this.router.navigate(["/admin"]);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
