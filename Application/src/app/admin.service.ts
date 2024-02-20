import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }


  addOrEdit(user:any)
  {
    return this._http.put<any>('http://localhost:8000/admin/saveEmployee',user);
  }


  getDriver()
  {
    return this._http.get<any>('http://localhost:8000/admin/getDriver');
  }

  deleteEmployee(id:any)
  {
    return this._http.delete('http://localhost:8000/admin/deleteEmployee/'+id);
  }

  deleteDriver(id:any)
  {
    return this._http.delete('http://localhost:8000/admin/deleteDriver/'+id);
  }

  addOrEditDriver(driver:any)
  {
    return this._http.put<any>('http://localhost:8000/admin/saveDriver',driver);
  }

  addDriverRoute(driver:any)
  {
    return this._http.put<any>('http://localhost:8000/admin/addRouteToDriver',driver);
  }

  getRoutes()
  {
    return this._http.get<any>('http://localhost:8000/admin/getDriverRoutes');
  }

  getRoute(place:string)
  {
    return this._http.get<any>('http://localhost:8000/admin/getDriverRoutes/'+place);
  }

  deleteDriverRoute(id:any)
  {
    return this._http.delete('http://localhost:8000/admin/deleteDriverRoutes/'+id);
  }
  SearchUserByName(name:any)
  {
    return this._http.get<any>('http://localhost:8000/admin/searchDriver/'+name);
  }
}