import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { emailValidation } from '../Validations/email.validatior';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : any
  wrongMessage : string = ""
  constructor(private formBuilder : FormBuilder,private service : UserService,private router:Router) { 
    this.loginForm = this.formBuilder.group({
      emailId : ['',[Validators.required]],
      password : ['',Validators.required],
    })
  }

  ngOnInit(): void {

  }
  
  Login()
  {
    let form = this.loginForm.value;
    if(form.emailId == "admin@gmail.com" && form.password == "bneeraj27")
    {
      localStorage.setItem('emailId',"neeraj.badam@gmail.com");
      this.router.navigate(['admin']);
    }
    
    this.service.Login(form)
    .subscribe(
      data => {
        console.log(data);
          if(data.success)
          {
            localStorage.setItem('emailId',form.emailId);
            localStorage.setItem('userId',form.emailId);
            this.router.navigate(['route']);
          }
          else
          {
            this.wrongMessage = "Invalid details";
          }
      }
    )
  }

}
