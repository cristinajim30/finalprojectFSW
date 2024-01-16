import { Component } from '@angular/core';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  user: User;
  validName=true
  validEmail=true

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserServiceService){
    this.user = new User();
  }

  onSubmit(){
    this.validateInputs()
    if (this.validName && this.validEmail){
      this.userService.save(this.user).subscribe(result => this.gotoUserList())
    }
    
  }

  gotoUserList(){
    this.router.navigate(['/users']);
  }

  validateInputs(){
    console.log("name: ", this.user.name)
    switch (this.user.name){
      case undefined: { 
        console.log("name undefined: ", this.user.name ," ", this.user.email)
        this.validName= false
        break; 
     } 
     case " ": { 
      console.log("name with spaces: ", this.user.name ," ", this.user.email )
      this.validName= false
        break; 
     } 
    }
    switch (this.user.email){
      case undefined: { 
        console.log("email undefined: ", this.user.email)
        this.validEmail= false
        break; 
     } 
     case " ": { 
      console.log("email with spaces: ",  this.user.email )
      this.validEmail= false
        break; 
     } 
    }
    
  }
}
