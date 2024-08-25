import { Component } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/Course';
@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent {

  constructor(private courseService: CourseService, private router: Router){}

  course :Course = {} as Course;
  saveCourse(form:any) {
    debugger;
    this.course.title = form.value.title,
    this.course.description = form.value.description,
    this.course.price = form.value.price
    this.courseService.createCourse(this.course).subscribe(() => {
      this.router.navigate(['/course-list']);
    });
  }
}
