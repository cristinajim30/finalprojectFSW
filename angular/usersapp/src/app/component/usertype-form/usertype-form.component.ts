import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeuserService } from '../../services/typeuser.service';
import { TypeUser } from '../../model/type-user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usertype-form',
  templateUrl: './usertype-form.component.html',
  styleUrl: './usertype-form.component.css'
})
export class UsertypeFormComponent {

  id?: any;
  isEditMode?: boolean;

  typeForm!: FormGroup;
  typeUser: TypeUser; 
  userTypeList: TypeUser[] = [];
  isSucessfull: boolean = false;

  constructor(private route: ActivatedRoute, private userTypeService: TypeuserService){
    this.typeUser = new TypeUser();
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
      this.userTypeService.findUserTypeById(this.id).subscribe(data => {
        // fill inputs of user
        this.typeForm.patchValue(data);
        //console.log("type for edit: ", user.usertype.type)
        //set the value of usertype to fill the select option
        this.typeForm.patchValue({
          type: data.type
        })
        //console.log("seleccionado dsp: ", this.typeForm.get('type')?.value)
        this.loadUsersType();
      });

    }
    
  }

  onSubmit() {
    this.validateUserType();
    
  }

  validateUserType(){
    if (this.typeForm.valid) {
      //console.log("valid: ", this.typeForm.value);
      //console.log("type: ", this.typeForm.get('type')?.value);
      let typenew = new TypeUser();
      typenew.type=this.typeForm.get('type')?.value;
      
     if (this.isEditMode) {
        this.updateUserType(typenew);
      } else {
        this.createUserType(typenew);
      }

    }
  }

  validationsForm(){
    this.typeForm = new FormGroup({
      type: new FormControl('', Validators.required)
    })
  }

  loadUsersType(){
    this.userTypeService.findUsersType().subscribe(data => {
      this.userTypeList = data;
    })
    //console.log("list type: ", this.userTypeList)
  }

  createUserType(typenew : TypeUser){
    this.userTypeService.save(typenew).subscribe(
      response => {
        this.typeForm.reset();
        this.isSucessfull = true;
      //console.log('Solicitud POST exitosa:', response);
   },
   error => {
      console.error('Error saving user:', error);
   });
  }

  updateUserType(typenew : TypeUser){
    typenew.id = this.id;
    this.userTypeService.edit(typenew).subscribe(
      response => {
        this.typeForm.reset();
        this.isSucessfull = true;
        //console.log('Solicitud POST update exitosa:', response);
      },
      error => {
         console.error('Error updating usertype:', error);
      });
  }

  
}
