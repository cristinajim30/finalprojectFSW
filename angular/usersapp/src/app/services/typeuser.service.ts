import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeUser } from '../model/type-user';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeuserService {

  private usersUrl: string;
  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8081/api/type';
   }

  public findUsersType(){
    return this.http.get<TypeUser[]>(this.usersUrl);
   }

   public findUserTypeById(id: number): Observable<TypeUser>{
    return this.http.get<TypeUser>(this.usersUrl + '/' + id)
   }

   public save(type: TypeUser){
    return this.http.post<TypeUser>(this.usersUrl, type, {responseType: 'text' as 'json'})
   }

   public edit(type: TypeUser){
    return this.http.put<TypeUser>(this.usersUrl, type, {responseType: 'text' as 'json'})
   }

   public delete(userTypeid: number){
    return this.http.delete<void>(this.usersUrl + '/' + userTypeid, {observe: 'response'})
    .pipe(
      catchError(error => {
        alert("It is not possible to delete a type user because there are users with this type user")
        return throwError(error); // Send the error to the component
      })
    );
   }
}
