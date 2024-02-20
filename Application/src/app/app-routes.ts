import { Routes } from '@angular/router'
import { AdminComponent } from './admin/admin.component'
import { AuthGuard } from './auth.guard'
import { EmployeesComponent } from './employees/employees.component'
import { LoginComponent } from './login/login.component'
import { PlacesComponent } from './places/places.component'
import { RoutesComponent } from './routes/routes.component'
import { SearchComponent } from './search/search.component'
import { SignupComponent } from './signup/signup.component'
import { UserComponent } from './user/user.component'
import { UserhomeComponent } from './userhome/userhome.component'
export const routes : Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'signup',component:SignupComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:UserComponent,canActivate : [AuthGuard]},
    {path:'route',component:UserhomeComponent,canActivate : [AuthGuard]},
    {path:'admin',component:AdminComponent,canActivate : [AuthGuard]},
    {path:'admin/routes',component:RoutesComponent,canActivate:[AuthGuard]},
    {path:'admin/employees/:id',component:EmployeesComponent,canActivate:[AuthGuard]},
    {path:'admin/routes/:id',component:PlacesComponent,canActivate:[AuthGuard]},
    {path:'users/routes/:id',component:SearchComponent,canActivate:[AuthGuard]}
] 