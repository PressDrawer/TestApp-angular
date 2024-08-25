import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './course/courses/courses/courses.component';
import { AddcourseComponent } from './course/addcourse/addcourse/addcourse.component';
import { EditcourseComponent } from './course/editcourese/editcourse/editcourse.component';
import { CourseComponent } from './course/course/course/course.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { LoginComponent } from './auth/register/Login/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/course-list', pathMatch: 'full' },
  { path: 'course-list', component: CoursesComponent },
  { path: 'course-create', component: AddcourseComponent,canActivate: [AuthGuard] },
  { path: 'course-edit/:id', component: EditcourseComponent,canActivate: [AuthGuard] },
  { path:'course-view/:id,',component:CourseComponent,canActivate: [AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

  
}
