import { Component, OnInit } from '@angular/core';
import { UserIdentified } from '../../../auth/interfaces/UserIdentified.interface';
import { UserPermissions } from '../../../auth/interfaces/UserPermissions.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  public token: string;
  public user: UserIdentified | undefined;
  public userPermissions: any;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {

    this.token = this._authService.getToken();
  }

  ngOnInit(): void {
    this._authService.userData(this.token).subscribe({
      next: (user) => {
        this.user = user;

        localStorage.setItem('currentUser', JSON.stringify(this.user));

        this._authService.logged(this._authService.getCurrentUser());


        this._authService.userPermissions(this.token).subscribe({
          next: (resp) => {

            this.userPermissions = resp.permissions;
            this._authService.permissionUser(this.userPermissions);
      
          },
          error: (e) => {
            console.log(e);
            this._router.navigate(['/auth/login'])

          }
          ,
        })

      },
      error: (e) => {
        this._router.navigate(['/auth/login'])
        console.log(e);
      }
      ,
    });
  }

}
