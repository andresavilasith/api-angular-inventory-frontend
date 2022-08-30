import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {


  user_passport = {
    client_id: 0,
    client_secret: '',
    grant_type: '',
    username: '',
    password: '',
  }


  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._authService.loginData().subscribe({
      next: (resp) => {
        this.user_passport.client_id = resp.data.client_id;
        this.user_passport.client_secret = resp.data.client_secret;
        this.user_passport.grant_type = resp.data.grant_type;
      },
      error: (e) => {
        console.log(e);
      }
      ,
    })
  }

  onSubmit(loginForm: any) {
    this.user_passport.username = loginForm.value.email;
    this.user_passport.password = loginForm.value.password;

    this._authService.loginToken(this.user_passport).subscribe({
      next: (resp) => {
        localStorage.setItem('token', resp.access_token);
        this._router.navigate(['/panel'])
      },
      error: (e) => {
        this._router.navigate(['/auth/login'])
        this._authService.logout();
        console.log(e);
      }
      ,
    })
  };

}
