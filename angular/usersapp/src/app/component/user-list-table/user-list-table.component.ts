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
    this.loadComponent();
  }
 

  editUser(userid: any){
    console.log("method editUser: ", userid)
    let txtButtom = "Edit";
    this.router.navigate(['/adduser']);
    //this.userService.edit(userid).subscribe(result => this.gotoUser());
    console.log("end method editUser")
  }

  /*gotoUser(){
    console.log("starting method gotoUser")
    let currentUrl = this.router.url;
    this.router.navigate([currentUrl]);
    console.log("end method gotoUser")
  }*/

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
