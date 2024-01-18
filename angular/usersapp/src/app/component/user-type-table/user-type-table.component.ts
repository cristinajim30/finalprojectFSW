import { Component } from '@angular/core';
import { TypeUser } from '../../model/type-user';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeuserService } from '../../services/typeuser.service';

@Component({
  selector: 'app-user-type-table',
  templateUrl: './user-type-table.component.html',
  styleUrl: './user-type-table.component.css'
})
export class UserTypeTableComponent {
  title="User Type list";
  typeusers: TypeUser[] = [];
  

  constructor(private route: ActivatedRoute, private router: Router, private userTypeService: TypeuserService){
  }

  ngOnInit(){
    this.loadData();
  }

  loadData(){
    this.userTypeService.findUsersType().subscribe(data => {
      this.typeusers = data;
    })
    console.log("list type: ", this.typeusers)
  }

  editUserType(id: any){
    console.log("method editUserType id-: ", id)
    this.router.navigate(['/editusertype', id]);
    //this.userService.edit(userid).subscribe(result => this.gotoUser());
    console.log("end method editUserType")
  }

  deleteUserType(userTypeId: any){
    confirm("Are you sure you want to delete this user?")
    this.userTypeService.delete(userTypeId).subscribe(result => this.loadData());
  }
  
 
}
