import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }


  Register(user:any)
  {
    return this._http.post<any>('http://localhost:8000/users/signup',user);
  }

  Login(user:any)
  {
    console.log("Service")
    console.log(user)

    return this._http.post<any>('http://localhost:8000/users/login',user);
  }
  loggedIn()
  {
    return !!localStorage.getItem('emailId');
  }
  
  getRoutes()
  {
    return this._http.get<any>('http://localhost:8000/users/getDriverRoutes');
  }

  updateUser(user:any)
  {
    let id = localStorage.getItem('userId');
    return this._http.put<any>('http://localhost:8000/users/editUser/'+id,user);
  }

  bookTicket(driver:any)
  {
    let id = localStorage.getItem('userId');
    return this._http.post<any>('http://localhost:8000/users/saveBooking',{id,driver});
  }

  cancelTicket(user:any)
  {
    let id = localStorage.getItem('userId');
    return this._http.delete('http://localhost:8000/users/cancelBooking/'+id);
  }

  searchRoute(place:string)
  {
    return this._http.get<any>('http://localhost:8000/users/getRoutes/'+place);
  }
  
}