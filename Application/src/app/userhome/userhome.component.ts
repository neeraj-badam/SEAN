import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { places } from '../home-display';
import { UserService } from '../user.service';

import {startWith, switchMap} from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  data = places
  bookdata : any = []
  clicked : boolean = false
  date = new Date()
  message : string = ""
  search : string = "" 
  currentDate: Date = new Date();
  dd !: number
  mm !: number
  yyyy !: number 
  today !: string
  constructor(private activatedRoute:ActivatedRoute,private userService : UserService,config: NgbModalConfig, private modalService: NgbModal) {
    console.log(this.currentDate)
    this.dd = this.currentDate.getDate()
    this.mm = this.currentDate.getMonth()+1
    this.yyyy = this.currentDate.getFullYear()
    this.today = this.yyyy + '/' + this.mm + '/' + this.dd;
    console.log(this.today)
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;
   }

  ngOnInit(): void {
    interval(2000)
    .pipe(
      startWith(0),
      switchMap( () => this.userService.getRoutes())
    ).subscribe(
      data =>{
        this.data = data;
        console.log(this.data)
      }
    )


    }

  // ngOnInit(): void {
  //   setInterval(()=>{
  //   this.userService.getRoutes()
  //     .subscribe(
  //       data => {
  //         this.data = data;
  //         console.log("On init");
  //         console.log(this.data);
  //       }
  //     )
  //   },2000)
  // }

  book(item:any)
  {
    this.clicked = true
    this.bookdata = item;
    console.log(this.bookdata)
  }
  open(content:any) {
    this.modalService.open(content);
  }
  closePopup()
  {
    this.message = '';
    this.clicked = false;
  }

  bookTicket()
  {
    console.log(this.bookdata)
    this.userService.bookTicket(this.bookdata)
    .subscribe(
      data => {
        if(data.success)
          this.message = `Ticket Booked Successfully`
        else
          this.message = 'You may already booked the ticket or please try after sometime'
      }
    )
  }

  cancelTicket()
  {
    console.log(this.bookdata)
    this.userService.cancelTicket(this.bookdata)
    .subscribe(
      data => {
        const result = data;
        if(result)
        {
          this.message = 'Ticket Cancelled Successfully';
        }
        else
        {
          this.message = 'You may not booked the ticket or try again later';
        }
      }
    )
  }
  
}