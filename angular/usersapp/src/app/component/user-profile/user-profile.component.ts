import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { UserServiceService } from '../../services/user-service.service';
import { TypeUser } from '../../model/type-user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  title= "User profile";
  id: any;
  userDetail: User;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserServiceService){
    this.userDetail = new User();
    this.userDetail.usertype = new TypeUser();
  }
  
   ngOnInit(){
    //retrieve the id value for the param
    this.id = this.route.snapshot.params['id'];
    this.loadComponent();
  }

   loadComponent(){
     this.userService.findById(this.id).subscribe(data => {
      this.userDetail = data;
    })
  }


}
