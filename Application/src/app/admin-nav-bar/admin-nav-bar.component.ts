import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  width = '0px'
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  openNav() {
    this.width = '250px'
  }
  
  closeNav() {
    this.width = '0px'
  }
}
