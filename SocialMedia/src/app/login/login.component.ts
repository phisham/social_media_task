import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:any;
  showError:any=false;
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      username:new FormControl('',Validators.required),
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
    })
    const token =localStorage.getItem("user");
    console.log(token);
    if (token) {
      this.router.navigateByUrl('/main');
    }
  }

  login(){
    console.log(this.loginForm.value);
    this.http.post('https://social-media-task-backend.vercel.app/users/login',this.loginForm.value).subscribe((data:any)=>{
      console.log(data);
      localStorage.setItem("user",data.token);
      this.router.navigateByUrl('/main');
    },(err:any)=>{
      console.log(err);
      this.showError=true
    })
  }

}
