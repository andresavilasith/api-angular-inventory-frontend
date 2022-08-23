import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserRegister } from '../../interfaces/UserRegister.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  errors : any;
  
  user = {
    name: '',
    email: '',
    password: '',
  };
  userRegister: UserRegister = {
    user: this.user,
    status: ''
  };

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(user: UserRegister['user']) {
    this.user = user;
    this._authService.register(this.user)
      .subscribe({
        next: (resp) => {
          if (resp['status'] == 'success') {
            this._router.navigate(['/auth/login'])
          }
        },
        error: (e) => {
          this.errors = e?.error?.errors
          console.log(this.errors);
          
        }
        ,
      })

  }
}
