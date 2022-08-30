import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { UserPermissions } from './auth/interfaces/UserPermissions.interface';
import { User } from './auth/interfaces/User.interface';
import { Subject } from 'rxjs';
import { UserIdentified } from './auth/interfaces/UserIdentified.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'invent-app-frontend';
  public loggedIn: boolean;
  public token: string;
  public user: UserIdentified | any;
  public permissionsSlug: any ;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this.token = this._authService.getToken();
    this.loggedIn = false;
  }

  ngOnInit(): void {
    this._authService.isUserLogged().subscribe({
      next: (loggedIn) => {
        this.loggedIn = loggedIn;

        this._authService.isUserCurrent().subscribe({
          next: (user) => {
            this.user = user;

            this._authService.isUserPermission().subscribe({
              next: (permissionsSlug) => {

                this.permissionsSlug = permissionsSlug;
                console.log(this.permissionsSlug);
                

              },
              error: (e) => {
                this._router.navigate(['/auth/login'])
                console.log(e);
              }
              ,
            })
          },
          error: (e) => {
            this._router.navigate(['/auth/login'])
            console.log(e);
          }
          ,
        })


      },
      error: (e) => {
        this._router.navigate(['/auth/login'])
        console.log(e);
      }
      ,
    })

  }

}
