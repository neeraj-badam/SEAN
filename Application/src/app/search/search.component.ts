import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { interval } from 'rxjs';
import { places } from '../home-display';

import {startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  data = places
  bookdata : any = []
  clicked : boolean = false
  date = new Date()
  message : string = ""
  search !: string
  routes = 0


  constructor(private activatedRoute:ActivatedRoute,private userService : UserService) { }

  ngOnInit(): void {
    this.search = this.activatedRoute.snapshot.params.id
    console.log(this.search)
    interval(2000)
    .pipe(
      startWith(0),
      switchMap( () => this.userService.searchRoute(this.search))
    ).subscribe(
      data =>{
        this.data = data;
        this.routes = this.data.length;
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
  closePopup()
  {
    this.clicked = false;
  }


}
