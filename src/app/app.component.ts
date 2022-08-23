import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { UserPermissions } from './auth/interfaces/UserPermissions.interface';
import { User } from './auth/interfaces/User.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'invent-app-frontend';
  public loggedIn: boolean;
  //public permissions_slug: UserPermissions;
  public token: string;
  //public user: User;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loggedIn = false;
    this.token = this._authService.getToken()
  }

  ngOnInit(): void {
    this._authService.isUserLogged().subscribe({
      next: (resp) => {
        this.loggedIn = resp;
        
        this._authService.isUserCurrent().subscribe({
          next: (us) => {
            console.log(us);
            this._authService.isUserPermission().subscribe({
              next: (perm) => {
                console.log(perm);
                
              },
              error: (e) => {
                console.log(e);
              }
              ,
            })
          },
          error: (e) => {
            console.log(e);
          }
          ,
        })
      },
      error: (e) => {
        console.log(e);
        this._router.navigate(['/auth/login'])
      }
      ,
    })
  }

  ngOnDestroy(): void {
    sessionStorage.clear()
  }
}
