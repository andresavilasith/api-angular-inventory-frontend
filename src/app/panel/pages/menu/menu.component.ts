import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/User.interface';
import { UserIdentified } from '../../../auth/interfaces/UserIdentified.interface';
import { UserPermissions } from '../../../auth/interfaces/UserPermissions.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  @Input() loggedIn: any;
  @Input() token: string;
  @Input() user: UserIdentified | undefined;
  @Input() permissionsSlug: any;
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
          next: (permissions) => {

            this.permissionsSlug = Object.values(permissions);
            
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

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/auth/login'])
  }

}
