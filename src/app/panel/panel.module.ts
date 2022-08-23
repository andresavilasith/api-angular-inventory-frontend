import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { UsersComponent } from './pages/user/users/users.component';
import { UserComponent } from './pages/user/user/user.component';
import { NewUserComponent } from './pages/user/new-user/new-user.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { RolesComponent } from './pages/role/roles/roles.component';
import { RoleComponent } from './pages/role/role/role.component';
import { NewRoleComponent } from './pages/role/new-role/new-role.component';
import { EditRoleComponent } from './pages/role/edit-role/edit-role.component';
import { MenuComponent } from './pages/menu/menu.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    NewUserComponent,
    EditUserComponent,
    RolesComponent,
    RoleComponent,
    NewRoleComponent,
    EditRoleComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    PanelRoutingModule
  ],
  exports:[
    MenuComponent
  ]
})
export class PanelModule { }
