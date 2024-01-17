import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListTableComponent } from './component/user-list-table/user-list-table.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { HomeComponent } from './component/home/home.component';
import { UserlistComponent } from './component/userlist/userlist.component';
import { TypeuserComponent } from './component/typeuser/typeuser.component';
import { UserTypeTableComponent } from './component/user-type-table/user-type-table.component';
import { UsertypeFormComponent } from './component/usertype-form/usertype-form.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'userlisttab', component: UserlistComponent},
  {path: 'typeuserlisttab', component: TypeuserComponent},
  {path: 'users', component: UserListTableComponent},
  {path: 'adduser', component: UserFormComponent},
  {path:'userstype', component:UserTypeTableComponent},
  {path: 'addusertype', component:UsertypeFormComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
