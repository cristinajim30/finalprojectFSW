import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListTableComponent } from './component/user-list-table/user-list-table.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { HomeComponent } from './component/home/home.component';
import { UserlistComponent } from './component/userlist/userlist.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'userlisttab', component: UserlistComponent},
  {path: 'users', component: UserListTableComponent},
  {path: 'adduser', component: UserFormComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
