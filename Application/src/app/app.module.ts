import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app-routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { UserNavBarComponent } from './user-nav-bar/user-nav-bar.component';
import { AuthGuard } from './auth.guard';
import { RoutesComponent } from './routes/routes.component';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import { EmployeesComponent } from './employees/employees.component';
import { PlacesComponent } from './places/places.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    UserhomeComponent,
    UserComponent,
    AdminComponent,
    UserNavBarComponent,
    RoutesComponent,
    AdminNavBarComponent,
    EmployeesComponent,
    PlacesComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
