import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { UserRegister } from '../interfaces/UserRegister.interface';
import { User } from '../interfaces/User.interface';
import { UserPermissions } from '../interfaces/UserPermissions.interface';
import { LoginToken } from '../interfaces/LoginToken.interface';
import { LoginData } from '../interfaces/LoginData.interface';
import { UserPassport } from '../interfaces/UserPassport.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: any;
  public user_storage: any;
  public loggedChanged = new Subject<boolean>();
  public currentUser = new Subject<User>();
  public permissions_slug: any[] = [];
  public permissionsUser = new Subject<any>();
  public baseUrl: string;
  public authUrl: string;
  public oauthTokenUrl: string;

  constructor(private _http: HttpClient) {
    this.baseUrl = environment.baseUrl;
    this.authUrl = environment.authUrl;
    this.oauthTokenUrl = environment.oauthTokenUrl;
  }

  register(user: UserRegister['user']): Observable<User> {
    return this._http.post<User>(`${this.authUrl}/register`, user);
  }
  loginData(): Observable<LoginData> {
    return this._http.get<LoginData>(`${this.authUrl}/login-data`);
  }

  loginToken(user: UserPassport): Observable<LoginToken> {
    return this._http.post<LoginToken>(this.oauthTokenUrl, user);
  }


  isUserCurrent(): Subject<User> {
    return this.currentUser;
  }


  isUserPermission(): Subject<any> {
    return this.permissionsUser;
  }

  userData(token: any): Observable<any> {
    var headers = new HttpHeaders().set('Authorization', token)

    return this._http.get(`${this.authUrl}/user/identified`, { headers: headers })
}


userPermissions(token: any): Observable<UserPermissions> {
    var headers = new HttpHeaders().set('Authorization', token)

    return this._http.get<UserPermissions>(`${this.authUrl}/user/permissions`, { headers: headers })
}

  getToken() {
    this.token = 'Bearer ' + localStorage.getItem('token');
    return this.token;
  }

  logged(user: User): void {
    this.loggedChanged.next(true);
    this.currentUser.next(user);
  }

  permissionUser(permissions: any): void {

    this.permissions_slug = [];
    for (let perm of permissions) {
      this.permissions_slug.push(perm.slug);
      this.permissionsUser
    }

    this.permissionsUser.next(this.permissions_slug);

  }


  getCurrentUser() {
    this.user_storage = localStorage.getItem('currentUser');

    return JSON.parse(this.user_storage)
  }


  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    return this.loggedChanged.next(false);
  }

  isUserLogged(): Subject<boolean> {
    return this.loggedChanged;
  }


}
