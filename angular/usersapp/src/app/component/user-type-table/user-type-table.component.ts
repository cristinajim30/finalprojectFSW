import { Component } from '@angular/core';
import { TypeUser } from '../../model/type-user';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeuserService } from '../../services/typeuser.service';

@Component({
  selector: 'app-user-type-table',
  templateUrl: './user-type-table.component.html',
  styleUrl: './user-type-table.component.css'
})
export class UserTypeTableComponent {
  title="User Type list";
  typeusers: TypeUser[] = [];
  tableColumns: string[] = ['Id', 'Type'];

  //variables to sort the table
  sortKey: any = '';
  reverse: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private userTypeService: TypeuserService){
  }

  ngOnInit(){
    this.loadData();
  }

  loadData(){
    this.userTypeService.findUsersType().subscribe(data => {
      this.typeusers = data;
    })
    console.log("list type: ", this.typeusers)
  }

  editUserType(id: any){
    console.log("method editUserType id-: ", id)
    this.router.navigate(['/editusertype', id]);
    //this.userService.edit(userid).subscribe(result => this.gotoUser());
    console.log("end method editUserType")
  }

  deleteUserType(userTypeId: any){
    confirm("Are you sure you want to delete this user?")
    this.userTypeService.delete(userTypeId).subscribe(
      result => this.loadData()
      ),
      (error: any) => {
        console.error('Error al eliminar tipo usuario:', error);
        alert("No se puede eliminar esta categoria porque la contiene uno o varios usuarios");
        // Manejar el error si es necesario
     };
      /*error => {
        // Manejar el error aquí
        console.error("Error al eliminar:", error);
        alert("No se puede eliminar esta categoria porque la contiene uno o varios usuarios")
        // Puedes realizar acciones adicionales según tus necesidades, como mostrar un mensaje al usuario.
      }*/
  }

  sortTable(key: any){
    //function to sort table in ascending or descending order by key name
    key = key.charAt(0).toLowerCase() + key.slice(1);
    this.reverse = this.sortKey === key ? !this.reverse : false;
    this.sortKey = key;
    console.log("Key: ", key)
    this.typeusers.sort((a, b) => {
      console.log("a ", a)
      console.log("b ", b)
      const x = a[key as keyof TypeUser];
      const y = b[key as keyof TypeUser];
      return this.reverse ? (x > y ? -1 : 1) : (x < y ? -1 : 1)
    });
  }
  
 
}
