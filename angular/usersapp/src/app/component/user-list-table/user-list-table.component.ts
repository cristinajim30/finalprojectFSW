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
    this.router.navigate(['/edituser', id]);
  }

  viewUser(id:any){
    this.router.navigate(['/viewuser', id]);
  }
 

  sortTable(key: any){
  
    if (key === 'User Type'){
      key = key.split(" ")[1].toLowerCase();
      this.reverseOrder(key);
      this.users.sort((a, b) => {
        const x = a.usertype.type;
        const y = b.usertype.type;
        return this.reverse ? (x > y ? -1 : 1) : (x < y ? -1 : 1)
      });
    }
    else{
      key = key.charAt(0).toLowerCase() + key.slice(1);
      this.reverseOrder(key);
      this.users.sort((a, b) => {
        const x = a[key as keyof User];
        const y = b[key as keyof User];
        return this.reverse ? (x > y ? -1 : 1) : (x < y ? -1 : 1)
      });
    }
    
  }

  reverseOrder(key: any){
    this.reverse = this.sortKey === key ? !this.reverse : false;
      this.sortKey = key;
  }

  loadComponent(){
    this.userService.findAll().subscribe(data => {
      this.users = data;
    })
  }
 
  deleteUser(userid: any){
    confirm("Are you sure you want to delete this user?")
    this.userService.delete(userid).subscribe(result => this.loadComponent());
  }
}
