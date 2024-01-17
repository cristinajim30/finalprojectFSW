import { Component } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private router: Router,private userService: UserServiceService){
  }

  ngOnInit(){
    this.userService.findAll().subscribe(data => {
      this.users = data;
    })
  }

  editUser(userid: any){
    console.log("method editUser: ", userid)
    this.userService.edit(userid).subscribe(result => this.gotoUser());
    console.log("end method editUser")
  }

  gotoUser(){
    console.log("starting method gotoUser")
    this.router.navigate(['/users']);
    console.log("end method gotoUser")
  }
  deleteUser(userid: any){
    confirm("Are you sure you want to delete this user?")
    console.log("method deleteUser: ", userid)
    this.userService.delete(userid).subscribe(result => this.gotoUser());
    console.log("end method deleteUser")
  }
}
