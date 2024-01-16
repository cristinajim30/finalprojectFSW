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
    console.log("antes if")
    console.log("name antes: ", this.user.name)
    console.log("email antes: ", this.user.email)
    if(!this.user.name.trim()){
      console.log("vacio")
      console.log("name: ", this.user.name)
      this.validName=false
    }
    if(!this.user.email.trim()){
      console.log("vacio")
      console.log("email: ", this.user.email)
      this.validEmail=false
    }
    
  }
}
