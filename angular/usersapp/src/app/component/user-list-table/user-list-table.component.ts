import { Component, Input} from '@angular/core';
import {User} from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrl: './user-list-table.component.css'
})
export class UserListTableComponent {
  title="User list";
  users: User[] = [];
  tableColumns: string[] = ['UserType', 'Name', 'Firstname', 'Email'];
  sortKey: any = '';
  reverse: boolean = false;
  

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
    //function to sort table in ascending or descending order by key name
    this.reverse = this.sortKey === key ? !this.reverse : false;
    this.sortKey = key;
    console.log("Key: ", key)
    /*this.users.sort((a, b) => {
      const x = a[key];
      const y = b[key];
      return this.reverse ? (x > y ? -1 : 1) : (x < y ? -1 : 1)
    });*/
  }

 

  loadComponent(){
    this.userService.findAll().subscribe(data => {
      this.users = data;
    })
    console.log("user list: ", this.users)

    this.users.forEach(element => {
      const type= element.usertype
      console.log("element type: ", type)
      console.log("type: ", type.id, '-', type.type)
    });
  }
 
  deleteUser(userid: any){
    confirm("Are you sure you want to delete this user?")
    this.userService.delete(userid).subscribe(result => this.loadComponent());
  }
}
