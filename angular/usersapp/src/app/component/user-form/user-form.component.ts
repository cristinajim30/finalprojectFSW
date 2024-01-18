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
  title="Add / Edit an user";

  id?: any;
  isEditMode?: boolean;

  userForm!: FormGroup;
  
  userTypeList: TypeUser[] = [];
  usertypeselected!: TypeUser  ;
  user: User;
  //typeUser: TypeUser; 
  isSucessfull: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserServiceService, private userTypeService: TypeuserService){
    this.user = new User();
    //this.typeUser = new TypeUser();
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = this.id ? true : false;
    this.validationsForm();
    this.loadUsersType();
    if (this.isEditMode) {
      console.log("---Edit mode---id: ", this.id)
      this.userService.findById(this.id)
          .pipe(first())
          .subscribe(x => this.userForm.patchValue(x));
  }
  }
  validationsForm(){
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
    console.log("list type: ", this.userTypeList)
  }

  onSubmit() {
    
    this.validateUser()
    
  }


  validateUser(){
    if (this.userForm.valid) {
      console.log("valid: ", this.userForm.value);
      
      let usernew = new User();
      let typenew = new TypeUser();
      usernew.name=this.userForm.get('name')?.value;
      usernew.firstname=this.userForm.get('firstname')?.value;
      usernew.email=this.userForm.get('email')?.value;

      if (this.userForm.get('usertype')?.value ) {
        console.log("dentro if")
        this.userTypeList.forEach(element => {
          if(element.type === this.userForm.get('usertype')?.value){
            console.log("coincide: ", element.type)
            typenew.id = element.id;
            typenew.type = element.type;
          }
        });

        usernew.usertype = typenew;
      } else {
        console.error("El control del formulario o su valor es nulo.");
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
        console.log('Solicitud POST exitosa:', response);
      },
      error => {
         console.error('Error al guardar usuario:', error);
      });
  }

  updateUser(usernew: User){
    usernew.id = this.id;
    this.userService.edit(usernew).subscribe(
      response => {
        this.userForm.reset();
        this.isSucessfull = true;
        console.log('Solicitud POST editar exitosa:', response);
      },
      error => {
         console.error('Error al editar usuario:', error);
      });
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
