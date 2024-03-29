import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  UserListTableComponent } from './component/user-list-table/user-list-table.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MenuComponent } from './component/menu/menu.component';
import { TypeuserComponent } from './component/typeuser/typeuser.component';
import { UserlistComponent } from './component/userlist/userlist.component';
import { HomeComponent } from './component/home/home.component';
import { UserTypeTableComponent } from './component/user-type-table/user-type-table.component';
import { UsertypeFormComponent } from './component/usertype-form/usertype-form.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListTableComponent,
    UserFormComponent,
    MenuComponent,
    TypeuserComponent,
    UserlistComponent,
    HomeComponent,
    UserTypeTableComponent,
    UsertypeFormComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(withFetch()), 
    provideClientHydration()
    //UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
