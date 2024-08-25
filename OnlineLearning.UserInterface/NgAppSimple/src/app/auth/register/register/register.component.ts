import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authservice:AuthService,private router:Router) {}

  user:User={} as User
    submit(form:any):any{
     this.user={
      "email":form.value.email,
      "password":form.value.password,
     }
    
     this.authservice.registerUser(this.user).subscribe((response:any)=>{
      debugger
      console.log(response);
      this.router.navigate(['/login'])
    })

    }
}
