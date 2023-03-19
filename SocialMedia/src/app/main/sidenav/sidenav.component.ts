import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  users:any=false;
  profile:any=false;
  notifications:any=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(window.location.pathname);
    if(window.location.pathname=='/main/profile')
      this.profile=true;
    else if(window.location.pathname=='/main/notifications')
      this.notifications=true;
    else{
      this.users=true;
    }

  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigateByUrl('/login');
  }
  select(u:any){
    if(u=="users"){
      console.log("hii");
      this.users=true;
      this.notifications=false;
      this.profile=false;
    }
    else if(u=="notifications"){
      this.users=false;
      this.notifications=true;
      this.profile=false;
    }
    else{
      this.users=false;
      this.notifications=false;
      this.profile=true;
    }
  }
}
