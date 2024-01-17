import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeuserService } from '../../services/typeuser.service';
import { TypeUser } from '../../model/type-user';

@Component({
  selector: 'app-usertype-form',
  templateUrl: './usertype-form.component.html',
  styleUrl: './usertype-form.component.css'
})
export class UsertypeFormComponent {
  title="Add / Edit an user type";
  typeForm!: FormGroup;
  typeUser: TypeUser; 
  constructor(private userTypeService: TypeuserService){
    this.typeUser = new TypeUser();
  }
  ngOnInit(): void {
    this.typeForm = new FormGroup({
      type: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    // Handle form submission here
    if (this.typeForm.valid) {
      console.log("valid: ", this.typeForm.value);
      console.log("type: ", this.typeForm.get('type')?.value);
      this.userTypeService.save(this.typeUser).subscribe(
        response => {
        console.log('Solicitud POST exitosa:', response);
        // Manejar la respuesta si es necesario
     },
     error => {
        console.error('Error al guardar usuario:', error);
        // Manejar el error si es necesario
     });
    }
  }
}
