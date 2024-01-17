import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeUser } from '../model/type-user';

@Injectable({
  providedIn: 'root'
})
export class TypeuserService {

  private usersUrl: string;
  constructor(private http: HttpClient) {
    this.usersUrl = 'http://springboot:8081/api/type';
   }

  public findUsersType(){
    return this.http.get<TypeUser[]>(this.usersUrl);
   }

   public save(type: TypeUser){
    return this.http.post<TypeUser>(this.usersUrl, type, {responseType: 'text' as 'json'})
    
   }
}
