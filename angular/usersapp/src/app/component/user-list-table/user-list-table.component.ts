import { Component } from '@angular/core';
import {User} from '../../model/user'
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrl: './user-list-table.component.css'
})
export class UserListTableComponent {
  title="User list";
  users: User[] = [];

  constructor(private userService: UserServiceService){
  }

  ngOnInit(){
    this.userService.findAll().subscribe(data => {
      this.users = data;
    })
  }
}
