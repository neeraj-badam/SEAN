import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { emailValidation } from '../Validations/email.validatior';
import { mobileValidation } from '../Validations/mobile.validator';
import { usernameValidation } from '../Validations/user-name.validator';
import { interval } from 'rxjs';
import {startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  data : any[] = []
  editForm : any
  color : string = ""
  wrongMessage : string = ""
  noUsers : string = ""
  Search : string = ""
  constructor(private activatedRoute : ActivatedRoute,private adminService : AdminService,private formBuilder : FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.Search = this.activatedRoute.snapshot.paramMap.get('id') +""    
      interval(2000).
      pipe(
        startWith(0),
        switchMap( () => this.adminService.SearchUserByName(this.Search) )
      )
      .subscribe(
        (data)=> {
          this.data = data;
        }
      )


    this.editForm = this.formBuilder.group({
      username : ['',[Validators.required,Validators.minLength(5),usernameValidation]],
      phoneNo : ['',[Validators.required,mobileValidation]],
      emailId : ['',[emailValidation]]
    })


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
          }
          else if(data.saved)
          {
            this.wrongMessage = "User Added"
            this.color = "text-success"
          }
        }
      )
  
  }

  edit(user:any)
  {
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
    const id = driver.Id;
    console.log(id)
    this.adminService.deleteDriver(id)
    .subscribe(
      data => {
        console.log(data);
        alert("Driver Deleted");
      }
    )
  }
  
  SearchUsers()
  {
      let username = this.Search
      console.log("Function : "+username)
      this.adminService.SearchUserByName(username)
    .subscribe(
      data => {

      }
    )
  }

}
