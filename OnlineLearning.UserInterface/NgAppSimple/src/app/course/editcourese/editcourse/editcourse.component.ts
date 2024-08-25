import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.css']
})
export class EditcourseComponent {

  course: Course = { courseId: 0, title: '', description: '',price:0};
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourse(id).subscribe(data => this.course = data);
    this.course.courseId = id
  }

  saveCourse() {
    debugger
    this.courseService.updateCourse(this.course).subscribe(() => {
      this.router.navigate(['/course-list']);
    });
  } 
}
