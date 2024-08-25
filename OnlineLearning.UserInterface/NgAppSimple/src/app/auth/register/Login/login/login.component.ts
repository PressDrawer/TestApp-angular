import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authservice:AuthService,private router:Router) {}
     
    
    login:User={} as User
    loginRes:any;
    isLogged:any;
    
    submit(loginform:any):any{
      this.login={
        "email":loginform.value.email,
        "password":loginform.value.password
       }
    
     this.authservice.login(this.login).subscribe((res:any)=>{
      //debugger;
      this.loginRes=res;
      console.log(res)
      if(this.loginRes.token){
        
        localStorage.setItem('token',this.loginRes.token);
        localStorage.setItem('userId',this.loginRes.id);
        localStorage.setItem('islogged',"logged")
        this.router.navigate(['course-list']);
      }
      else{
        this.router.navigate(['login']);
      }
      //}
    });

    }

    ngOnInit(): void {
          
         }
}
