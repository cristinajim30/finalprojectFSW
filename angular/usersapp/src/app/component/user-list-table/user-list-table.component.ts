import { Component, Input} from '@angular/core';
import {User} from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { TypeUser } from '../../model/type-user';
import { TypeuserService } from '../../services/typeuser.service';

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrl: './user-list-table.component.css'
})
export class UserListTableComponent {
  title="User list";
  users: User[] = [];
  tableColumns: string[] = ['User Type', 'Name', 'Firstname', 'Email'];
  //variables to sort the table
  sortKey: any = '';
  reverse: boolean = false;
  typelist: TypeUser[] = [];
  

  constructor(private route: ActivatedRoute, private router: Router,private userService: UserServiceService){
  }

  ngOnInit(){
    this.loadComponent();
  }
 

  editUser(id: any){
    console.log("method editUser id-: ", id)
    this.router.navigate(['/edituser', id]);
    console.log("end method editUser")
  }

 

  sortTable(key: any){
    
    console.log("Key: ", key)
    if (key === 'User Type'){
      key = key.split(" ")[1].toLowerCase();
      console.log("key type:", key)
    
      this.reverse = this.sortKey === key ? !this.reverse : false;
      this.sortKey = key;
      console.log("sortkey: ", this.sortKey)
      this.users.sort((a, b) => {
        const x = a.usertype.type;
        const y = b.usertype.type;
        console.log("x: ", x)
        console.log("y: ", y)
        return this.reverse ? (x > y ? -1 : 1) : (x < y ? -1 : 1)
      });
    }
    else{
      console.log("entra else")
      key = key.charAt(0).toLowerCase() + key.slice(1);
      this.reverse = this.sortKey === key ? !this.reverse : false;
      this.sortKey = key;
    
      this.users.sort((a, b) => {
        console.log("a ", a)
        console.log("b ", b)
        const x = a[key as keyof User];
        const y = b[key as keyof User];
        return this.reverse ? (x > y ? -1 : 1) : (x < y ? -1 : 1)
      });
    }
    
  }


 

  loadComponent(){
    this.userService.findAll().subscribe(data => {
      this.users = data;
    })
    console.log("user list: ", this.users)
  }
 
  deleteUser(userid: any){
    confirm("Are you sure you want to delete this user?")
    this.userService.delete(userid).subscribe(result => this.loadComponent());
  }
}
