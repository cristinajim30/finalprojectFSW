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
  userTypeList: TypeUser[] = [];
  usertypeselected: TypeUser = this.userTypeList[0];

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserServiceService, private userTypeService: TypeuserService){
    this.user = new User();
    this.typeUser = new TypeUser();
  }
  ngOnInit(){
    //me traigo todo lo que hay en la tabla typeuser
    this.userTypeService.findUsersType().subscribe(data => {
      this.userTypeList = data;
    })
  }

  onSubmit(){
    this.validateInputs()
    if (this.validName && this.validEmail){
      console.log("user: ", this.user)
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
    if(!this.user?.name?.trim()){
      console.log("vacio")
      console.log("name: ", this.user.name)
      this.validName=false
    }
    if(!this.user?.email?.trim()){
      console.log("vacio")
      console.log("email: ", this.user.email)
      this.validEmail=false
    }
    
  }
}
