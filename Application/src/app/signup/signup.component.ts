import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { emailValidation } from '../Validations/email.validatior';

import { mobileValidation } from '../Validations/mobile.validator';
import { passwordValidator } from '../Validations/password-validator';
import { usernameValidation } from '../Validations/user-name.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : any
  wrongMessage : string = ""
  constructor(private formBuilder: FormBuilder,private service : UserService,private router : Router) { 
    this.signupForm = this.formBuilder.group({
      emailId : ['',[Validators.required,emailValidation]],
      username : ['',[Validators.required,Validators.minLength(5),usernameValidation]],
      phoneNo : ['',[Validators.required,mobileValidation]],
      password : ['',Validators.required],
      confirmPassword : ['',Validators.required],
      address : ['',Validators.required]
    },{validator:passwordValidator})
  }

  ngOnInit(): void {
  }
  Register()
  {
    console.log(this.signupForm.value);
    this.service.Register(this.signupForm.value)
    .subscribe(
      data => {
        console.log(data);
        if(data.user)
        {
          this.router.navigate(['login']);
        }
        else
        {
          this.wrongMessage = "An account has been already registered with this email"
        }
      }
    )
  }
}
