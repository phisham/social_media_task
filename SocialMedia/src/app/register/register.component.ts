import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:any;

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      username:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    })

  }

  register(){

    console.log(this.registerForm.value);
    this.http.post('https://social-media-task-backend.vercel.app/users/register',this.registerForm.value).subscribe((data):any=>{
      console.log(data);
      this.router.navigateByUrl('/login');
    },(err:any)=>{
      console.log(err);
    })
  }
}
