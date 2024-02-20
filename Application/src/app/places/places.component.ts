import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { places } from '../home-display';
import { mobileValidation } from '../Validations/mobile.validator';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  data : any
  search !: string
  bookdata : any = []
  clicked : boolean = false
  NoDriver : string = ""
  driverForm : any
  color = ""
  constructor(private activatedRoute : ActivatedRoute,private formBuilder:FormBuilder,private adminService : AdminService) {  

    
    this.driverForm = this.formBuilder.group({
      startPoint : ['',Validators.required],
      endPoint : ['',Validators.required],
      date : ['',Validators.required],
      time : ['',Validators.required],
      seats : ['',Validators.required],
      distance : ['',Validators.required],
      emailId : ['',[Validators.required]],
      vehicleModel : ['',Validators.required],
      vehicleNumber : ['',Validators.required],
    })

  }

  ngOnInit(): void {
    this.search = this.activatedRoute.snapshot.paramMap.get('id') +""
    const search = this.search;
    console.log(search)
    this.adminService.getRoute(search)
    .subscribe(
      data => {
        this.data = data;
        console.log(data);
      }
    )
    console.log(this.data)
  }
  book(item:any)
  {
    this.clicked = true
    this.bookdata = item;
  }
  addDriverRoute()
  {
    let addrouteForm = this.driverForm.value
    this.adminService.addDriverRoute(addrouteForm)
    .subscribe(
      data =>
      {
        if(data.updated)
        {
          this.NoDriver = "Route Updated please refresh your page";
          this.color = "text-success"
        }
        else if(data.Nodriver)
        {
          this.NoDriver = "Driver not yet registered to add routes";
          this.color = "text-danger"
        }
        else
        {
          this.NoDriver = "Route Added please refresh your page";
          this.color = "text-success"
        }
      }
    )
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
  deleteDriverRoute(item:any)
  {
    this.adminService.deleteDriverRoute(item.Id)
    .subscribe(
      data => {
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
  SearchRoutes()
  {
    const search = this.search;
    console.log(search)
    this.adminService.getRoute(search)
    .subscribe(
      data => {
        this.data = data;
      }
    )
  }
}
