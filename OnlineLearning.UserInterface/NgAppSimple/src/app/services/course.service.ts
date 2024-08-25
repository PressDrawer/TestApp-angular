import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
import {HttpClientModule,HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Course} from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  url = "https://localhost:7057/api/Course/"

  //get all courses from API
  getCourses(): Observable<Course[]> {
    debugger;
    return this.http.get<Course[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  //get course for a Id 
  getCourse(id: number): Observable<Course> {
    const url = `${this.url}${id}`;
    return this.http.get<Course>(url).pipe(
      catchError(this.handleError)
    );
  }

  //Create a course
  createCourse(course:Course):Observable<any>{
    return this.http.post(this.url,course).pipe(
      catchError(this.handleError)
    );;
  }

  //Update the course
  updateCourse(course: Course): Observable<Course> {
    debugger
    const url = `${this.url}${course.courseId}`;
    return this.http.put<Course>(url, course).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a course
  deleteCourse(id: number): Observable<void> {
    const url = `${this.url}${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    console.error('Server Error:', error);
    return throwError(() => new Error('Error occurred; please try again later.'));
  }
  
}
