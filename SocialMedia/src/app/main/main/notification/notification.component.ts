import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  userdata:any;
  data:any=[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    const token =localStorage.getItem("user");
    console.log(token);
    if (token) {
      this.userdata = token.split(".")[1];
      this.userdata = window.atob(this.userdata);
      this.userdata=JSON.parse(this.userdata);

    }
    this.userdata=this.userdata.user;
    console.log(this.userdata)

    this.http.get('https://social-media-task-backend.vercel.app/users/get/'+this.userdata.id).subscribe((dat:any)=>{
      this.userdata=dat;
    })

    this.http.get('https://social-media-task-backend.vercel.app/users/getAll').subscribe((dat:any)=>{
      for(let i=0;i<dat.length;i++){
        for(let j=0;j<this.userdata.friendRequest.length;j++){
          if(this.userdata.friendRequest[j]==dat[i].id)
            this.data.push(dat[i]);
        }
      }

    })
  }

  accept(i:any,ev:any){
    let ind1=this.userdata.friendRequest.indexOf(i.id);
    console.log(ind1);
    this.userdata.friendRequest.splice(ind1,1);
    i.friendList.push(this.userdata.id);
    let d={
      to:i.id,
      toBeUpdatedTo:{
        friendList:i.friendList
      },
      by:this.userdata.id,
      toBeUpdatedBy:{
        friendRequest:this.userdata.friendRequest
      },
    }
    this.http.patch('https://social-media-task-backend.vercel.app/users/acceptFriendRequest',d).subscribe((dat:any)=>{
      (ev.target as HTMLElement).style.backgroundColor='green';
      (ev.target as HTMLElement).style.color='black';
      (ev.target as HTMLElement).innerText="Accepted";
    })
  }
}
