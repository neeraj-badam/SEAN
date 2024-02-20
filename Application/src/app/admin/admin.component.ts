import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { users } from '../users-display';
import { emailValidation } from '../Validations/email.validatior';
import { mobileValidation } from '../Validations/mobile.validator';
import { usernameValidation } from '../Validations/user-name.validator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  search : string = ""
  data : any[] = []
  editForm : any
  color : string = ""
  wrongMessage : string = ""
  constructor(private formBuilder : FormBuilder,private adminService : AdminService) 
  {
    
    this.editForm = this.formBuilder.group({
      username : ['',[Validators.required,Validators.minLength(5),usernameValidation]],
      phoneNo : ['',[Validators.required,mobileValidation]],
      emailId : ['',[emailValidation]]
    })
  }

  ngOnInit(): void {
    this.adminService.getDriver()
    .subscribe(
      data =>
      {
        this.data = data;
        console.log(data);
      }
    )

  }

  editUser()
  {
    let form = this.editForm.value;
    this.adminService.addOrEditDriver(form)
      .subscribe(
        data => {
          console.log(data)
          if(data.updated)
          {
            this.wrongMessage = "User Updated"
            this.color = "text-success"
            alert("Please refresh your page")
          }
          else if(data.saved)
          {
            this.wrongMessage = "User Added"
            this.color = "text-success"
            alert("Please refresh your page")
          }
        }
      )
    
  }

  edit(user:any)
  {
    console.log(user);

      this.editForm.setValue({
        emailId : user.email__c,
        username : user.Name,
        phoneNo : user.mobile__c
      })
  }

  

  editDriver(driver:any)
  {
    console.log(driver)
      this.editForm.setValue({
        emailId : '',
        username : driver.username,
        phoneNo : driver.phoneNo
      })
  }
  deleteDriver(driver:any)
  {
    this.adminService.deleteDriver(driver.Id)
    .subscribe(
      data => {
        alert("Driver Deleted")
        window.location.reload();
      }
    )
  }
  SearchUsers()
  {
    let username = this.search
    this.adminService.SearchUserByName(username)
    .subscribe(
      data => {
        console.log(data);
      }
    )
  }
}