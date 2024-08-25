import { Component } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  courses: Course[] = [];
  isloggedin : boolean=false;
  constructor(private courseService: CourseService,private router: Router) { }

  ngOnInit(): void {
    this.getAllCourses();
    this.isloggedin=this.isLoggedin();
  }
  //load all courses
  getAllCourses() {
    this.courseService.getCourses().subscribe(
      data => this.courses = data,
      error => console.error('Error fetching courses', error)
    );
  }

  isLoggedin():boolean{
    if(localStorage.getItem('islogged')=="logged")
      {
        return true
      }
      return false
  }
  //Register a user
  register(){
    this.router.navigate(['/register'])
  }
  //Login user
  login(){
    this.router.navigate(['/login'])
  }
  //Logout a user
  logout(){
    this.router.navigate(['/login'])
    localStorage.clear();
  }

  //delete a course by id 
  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.courses = this.courses.filter(course => course.courseId !== id);
    });
  }
}
