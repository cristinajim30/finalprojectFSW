import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private usersUrl: string;
  constructor(private http: HttpClient) {
    this.usersUrl = 'http://springboot:8081/api/users';
   }

   public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
   }

   public save(user: User){
    console.log("metodo save en el servicio")
    return this.http.post<User>(this.usersUrl, user, {responseType: 'text' as 'json'})
   }

   public edit(user: User){
    return this.http.put<User>(this.usersUrl, user, {responseType: 'text' as 'json'})
   }

   public delete(userid: number){
    console.log('url para delete: ', this.usersUrl + '/' + userid)
    return this.http.delete<void>(this.usersUrl + '/' + userid)
   }
   
}
