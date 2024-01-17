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
    this.userService.edit(userid).subscribe(result => this.gotoUser());
  }

  gotoUser(){
    this.router.navigate(['/users']);
  }
  deleteUser(userid: any){
    this.userService.edit(userid).subscribe(result => this.gotoUser());
  }
}
