import { Component } from '@angular/core';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { TypeuserService } from '../../services/typeuser.service';
import { TypeUser } from '../../model/type-user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userForm!: FormGroup;
  title="Add / Edit an user";

  userTypeList: string[] = ['administrativo', 'manager'];
  usertypeselected: string = this.userTypeList[0];
  user: User;
  typeUser: TypeUser; 

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserServiceService){
    this.user = new User();
    this.typeUser = new TypeUser();
  }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      //usertype: new FormControl()
    })
  }
  onSubmit() {
    // Handle form submission here
    if (this.userForm.valid) {
      console.log("valid: ", this.userForm.value);
      console.log("name: ", this.userForm.get('name')?.value);
      let usernew = new User();
      usernew.name=this.userForm.get('name')?.value;
      usernew.firstname=this.userForm.get('firstname')?.value;
      usernew.email=this.userForm.get('email')?.value;
      //this.user.name = this.userForm.get('name');
      this.userService.save(usernew).subscribe(
        response => {
          this.userForm.reset();
          console.log('Solicitud POST exitosa:', response);
        },
        error => {
           console.error('Error al guardar usuario:', error);
        });
    }
  }

  gotoUserList(){
    this.router.navigate(['/users']);
    console.log('final method gotoUserList');
  }





  /*title="Add / Edit an user"
  user: User;
  typeUser: TypeUser;
  validName=true
  validEmail=true
  //type1: TypeUser = new TypeUser();
  userTypeList: string[] = ['administrativo', 'manager'];
  usertypeselected: string = this.userTypeList[0];

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserServiceService, private userTypeService: TypeuserService){
    this.user = new User();
    this.typeUser = new TypeUser();
  }
  ngOnInit(){
    //me traigo todo lo que hay en la tabla typeuser
    /*this.userTypeService.findUsersType().subscribe(data => {
      this.userTypeList = data;
    })
  }

  onSubmit(){
    this.validateInputs()
    if (this.validName && this.validEmail){
      console.log("user: ", this.user);
      this.userService.save(this.user).subscribe(result => this.gotoUserList());
      console.log("dsp save");
    }
    
  }


  gotoUserList(){
    this.router.navigate(['/users']);
    console.log('final method gotoUserList');
  }

  validateInputs(){
    //console.log("antes if")
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
    
  }*/
}
