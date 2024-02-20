import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { emailValidation } from '../Validations/email.validatior';
import { mobileValidation } from '../Validations/mobile.validator';
import { passwordValidator } from '../Validations/password-validator';
import { usernameValidation } from '../Validations/user-name.validator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  signupForm : any
  updateMessage : string = ""
  constructor(private formBuilder: FormBuilder,private service : UserService,private router : Router) { 
    this.signupForm = this.formBuilder.group({
      emailId : ['',[Validators.required,emailValidation]],
      username : ['',[Validators.required,Validators.minLength(5),usernameValidation]],
      phoneNo : ['',[Validators.required,mobileValidation]],
      password : ['',Validators.required],
      address : ['',Validators.required]
    },{validator:passwordValidator})
  }

  ngOnInit(): void {
    console.log(localStorage.getItem("emailId"))
    this.signupForm.setValue({
      emailId: localStorage.getItem("emailId"),
      username: '',
      phoneNo: null,
      address: '',
      password: ''
    })
  }
  logout()
  {
    
  }

  updateUser()
  {
    let form = this.signupForm.value;
    this.service.updateUser(form)
    .subscribe(
      data => {
        if(data.success)
        {
          this.updateMessage = "User Updated"
        }
        else
        {
          this.updateMessage = "Please try after sometime"
        }
      }
    )
  }
  Clo()
  {
    console.log(this.signupForm.value)
  }
}
