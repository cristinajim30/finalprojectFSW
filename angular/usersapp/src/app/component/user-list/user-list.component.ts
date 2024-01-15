import { Component } from '@angular/core';
import { User } from '../../model/user';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  users: User[] = [];

  constructor(private userService: UserServiceService){}

  ngOnInit(){
    this.userService.findAll().subscribe(data => {
      this.users = data;
    })
  }
  
}
