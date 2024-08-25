import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { LoginComponent } from './auth/register/Login/login/login.component';
import { CoursesComponent } from './course/courses/courses/courses.component';
//import { AddCourseComponent } from './course/addcourse/addcourse/addcourse.component';
import { AddcourseComponent } from './course/addcourse/addcourse/addcourse.component';
import { CourseComponent } from './course/course/course/course.component';
import { EditcourseComponent } from './course/editcourese/editcourse/editcourse.component';
import { CourseService, } from './services/course.service';
import { AuthInterceptorService } from './auth/register/auth-interceptor.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CoursesComponent,
    AddcourseComponent,
    CourseComponent,
    EditcourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CourseService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
