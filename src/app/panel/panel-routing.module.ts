import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/pages/login/login.component';
import { UsersComponent } from './pages/user/users/users.component';
import { UserComponent } from './pages/user/user/user.component';
import { NewUserComponent } from './pages/user/new-user/new-user.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'user/:id',
        component: UserComponent
      },
      {
        path: 'user-new',
        component: NewUserComponent
      },
      {
        path: 'user/:id/edit',
        component: EditUserComponent
      },
      {
        path: '**',
        component: LoginComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
