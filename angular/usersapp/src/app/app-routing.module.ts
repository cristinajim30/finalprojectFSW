import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListTableComponent } from './component/user-list-table/user-list-table.component';
import { UserFormComponent } from './component/user-form/user-form.component';

const routes: Routes = [
  {path: 'users', component: UserListTableComponent},
  {path: 'adduser', component: UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
