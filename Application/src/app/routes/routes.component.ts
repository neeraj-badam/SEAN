import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import {startWith, switchMap} from "rxjs/operators";
import { mobileValidation } from '../Validations/mobile.validator';
import { interval } from 'rxjs';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  data : any
  search !: string
  bookdata : any = []
  clicked : boolean = false
  NoDriver : string = ""
  driverForm : any
  color = ""
  constructor(private formBuilder:FormBuilder,private adminService : AdminService) {  

    
    this.driverForm = this.formBuilder.group({
      startPoint : ['',Validators.required],
      endPoint : ['',Validators.required],
      date : ['',Validators.required],
      time : ['',Validators.required],
      seats : ['',Validators.required],
      distance : ['',Validators.required],
      emailId : ['',[Validators.required,mobileValidation]],
      vehicleModel : ['',Validators.required],
      vehicleNumber : ['',Validators.required],
    })

  }

  ngOnInit(): void {


    interval(2000)
    .pipe(
      startWith(0),
      switchMap( () => this.adminService.getRoutes())
    ).subscribe(
      data =>{
        this.data = data;
        console.log(this.data)
      }
    )
  }
  book(item:any)
  {
    this.clicked = true
    this.bookdata = item;
  }
  populate(item:any)
  {
    this.driverForm = this.formBuilder.group({
      startPoint : item.startPoint__c,
      endPoint : item.endPoint__c,
      date : item.date__c,
      time : item.time__c,
      seats : item.remainingSeats__c,
      distance : item.distance__c,
      emailId : item.email__c,
      vehicleModel : item.vehicleModel__c,
      vehicleNumber : item.vehicleNumber__c,
    })
  }
  addDriverRoute()
  {
    let addrouteForm = this.driverForm.value
    this.adminService.addDriverRoute(addrouteForm)
    .subscribe(
      data =>
      {
        if(data.success)
        {
          this.NoDriver = "Route Updated please refresh your page";
          this.color = "text-success"
        }
        else if(data.Nodriver)
        {
          this.NoDriver = "Driver not yet registered with emailId to add routes";
          this.color = "text-danger"
        }
      }
    )
  }
  deleteDriverRoute(item:any)
  {
    console.log(item.Id);
    this.adminService.deleteDriverRoute(item.Id)
    .subscribe(
      (data) => {
        if(data)
        {
          alert("Route Deleted")
          window.location.reload();
        }
        else
        {
          alert("Please try after some time")
        }
      }
    )
  }
}
