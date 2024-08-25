import { Component } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { CourseService } from 'src/app/services/course.service';
import { Route, Router,ActivatedRoute } from '@angular/router';
//import {ActivatedRoute} from 
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent {
  constructor(private courseService: CourseService,private route: ActivatedRoute,
    private router: Router) { }
  course:Course ={} as Course
  //id = 

  ngOnInit(): void 
   {
    debugger
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getCourse(id)
    
   }

   getCourse(id:number) {
    debugger;
    this.courseService.getCourse(id).subscribe((res:any)=>{
      this.course=res
      console.log(res);
    });
  }


}
