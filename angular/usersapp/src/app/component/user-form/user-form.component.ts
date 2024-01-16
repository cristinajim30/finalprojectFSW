import { Component } from '@angular/core';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { TypeuserService } from '../../services/typeuser.service';
import { TypeUser } from '../../model/type-user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  title="Add / Edit an user"
  user: User;
  typeUser: TypeUser;
  validName=true
  validEmail=true
  userTypeList: string[] = [];
  usertypeselected: string = this.userTypeList[0];

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserServiceService, private userTypeService: TypeuserService){
    this.user = new User();
    this.typeUser = new TypeUser();
  }

  onSubmit(){
    this.validateInputs()
    if (this.validName && this.validEmail){
      this.userService.save(this.user).subscribe(result => this.gotoUserList())
    }
    
  }

  getUserTypeList(){
    this.userTypeService.findUsersType()
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
