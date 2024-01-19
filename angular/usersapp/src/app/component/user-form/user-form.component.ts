import { Component, Input } from '@angular/core';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { TypeuserService } from '../../services/typeuser.service';
import { TypeUser } from '../../model/type-user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  //title="Add / Edit an user";

  id?: any;
  isEditMode?: boolean;

  userForm!: FormGroup;
  
  userTypeList: TypeUser[] = [];
  user: User;
  isSucessfull: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserServiceService, private userTypeService: TypeuserService){
    this.user = new User();
    //this.typeUserToEdit = new TypeUser();
  }
  ngOnInit(): void {
    //retrieve the id value for the param
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = this.id ? true : false;
    this.validationsForm();
    this.loadUsersType();
    if (this.isEditMode) {
      //console.log("seleccionado antes: ", this.usertypeselected)
      this.validationsForm();
      //console.log("---Edit mode---id: ", this.id)
      this.userService.findById(this.id).subscribe(user => {
        // fill inputs of user
        this.userForm.patchValue(user);
        //console.log("type for edit: ", user.usertype.type)
        //set the value of usertype to fill the select option
        this.userForm.patchValue({
          usertype: user.usertype.type
        })
        //console.log("seleccionado dsp: ", this.userForm.get('usertype')?.value)
        this.loadUsersType();
      });

    }
  }
  validationsForm(){
    //console.log("validations form method")
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      usertype: new FormControl('', Validators.required)
    })
  }

  loadUsersType(){
    this.userTypeService.findUsersType().subscribe(data => {
      this.userTypeList = data;
    })
    //console.log("list type: ", this.userTypeList)
  }

  onSubmit() { 
    this.validateUser() 
  }


  validateUser(){
    //console.log("isValid: ", this.userForm.valid)
    if (this.userForm.valid) {
      //console.log("valid: ", this.userForm.value);
      
      let usernew = new User();
      let typenew = new TypeUser();
      usernew.name=this.userForm.get('name')?.value;
      usernew.firstname=this.userForm.get('firstname')?.value;
      usernew.email=this.userForm.get('email')?.value;

      //if the value is not empty or undefined
      if (this.userForm.get('usertype')?.value ) {
        //console.log("dentro if")
        this.userTypeList.forEach(element => {
          if(element.type === this.userForm.get('usertype')?.value){
            //console.log("coincide: ", element.type)
            typenew.id = element.id;
            typenew.type = element.type;
          }
        });

        usernew.usertype = typenew;
      } else {
        console.error("The form control or its value is null.");
      }
      
      if (this.isEditMode) {
        this.updateUser(usernew);
      } else {
        this.createUser(usernew);
      }
      
    }
  }

  createUser(usernew: User){
    this.userService.save(usernew).subscribe(
      response => {
        this.userForm.reset();
        this.isSucessfull = true;
        //console.log('Solicitud POST exitosa:', response);
      },
      error => {
         console.error('Error saving user:', error);
      });
  }

  updateUser(usernew: User){
    usernew.id = this.id;
    this.userService.edit(usernew).subscribe(
      response => {
        this.userForm.reset();
        this.isSucessfull = true;
        //console.log('Solicitud POST editar exitosa:', response);
      },
      error => {
         console.error('Error updating user:', error);
      });
  }
 
 
  gotoUserList(){
    this.router.navigate(['/users']);
    //console.log('final method gotoUserList');
  }

}
