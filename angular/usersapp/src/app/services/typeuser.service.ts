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
    console.log('url para typeid: ', this.usersUrl + '/' + id)
    return this.http.get<TypeUser>(this.usersUrl + '/' + id)
   }

   public save(type: TypeUser){
    return this.http.post<TypeUser>(this.usersUrl, type, {responseType: 'text' as 'json'})
   }

   public edit(type: TypeUser){
    return this.http.put<TypeUser>(this.usersUrl, type, {responseType: 'text' as 'json'})
   }

   public delete(userTypeid: number){
    console.log('url para delete: ', this.usersUrl + '/' + userTypeid)
    return this.http.delete<void>(this.usersUrl + '/' + userTypeid, {observe: 'response'})
    .pipe(
      catchError(error => {
        //console.error('Error en la petición DELETE:', error);
        alert("No se puede eliminar una categoria porque existen usuarios con esa categoria")
        return throwError(error); // Reenviar el error al componente
      })
    );
   }
}
