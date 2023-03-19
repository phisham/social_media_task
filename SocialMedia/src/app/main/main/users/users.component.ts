import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  filterTerm!:string;
  data:any=[];
  userdata:any;
  constructor(private http:HttpClient,private dialog:MatDialog) { }

  ngOnInit(): void {
    const token =localStorage.getItem("user");
    console.log(token);
    if (token) {
      this.userdata = token.split(".")[1];
      this.userdata = window.atob(this.userdata);
      this.userdata=JSON.parse(this.userdata);

    }
    console.log(this.userdata);
    this.http.get('https://social-media-task-backend.vercel.app/users/getAll').subscribe((dat:any)=>{

      for(let i=0;i<dat.length;i++){
        if(dat[i].id!=this.userdata.user.id){
            let c=0,d=0;
            for(let j=0;j<dat[i].friendRequest.length;j++){
              if(dat[i].friendRequest[j]==this.userdata.user.id){
                c=1;

              }
            }
            for(let j=0;j<this.userdata.user.friendList.length;j++){
              if(this.userdata.user.friendList[j]==dat[i].id){
                d=1;

              }
            }
            if(c==1){
              dat[i].status="Requested";
              this.data.push(dat[i]);
            }
            else if(d==1){
              dat[i].status="Accepted";
              this.data.push(dat[i]);
            }
            else{
              dat[i].status="Follow +";
              this.data.push(dat[i]);
            }
          }
          console.log(this.data);
        }
    })





  }

  follow(i:any,ev:any){
    console.log(this.userdata.user.id);

    i.friendRequest.push(this.userdata.user.id);
    const d={
      to:i.id,
      toBeUpdated:{
        "friendRequest":i.friendRequest
      }
    }
    console.log(d);
    this.http.patch('https://social-media-task-backend.vercel.app/users/sendFriendRequest',d).subscribe((dat:any)=>{
      (ev.target as HTMLElement).style.backgroundColor='lightgrey';
      (ev.target as HTMLElement).style.color='black';
      (ev.target as HTMLElement).innerText="Requested";
    })
  }

  view(i:any){
    const dialogRef=this.dialog.open(DialogboxComponent,{
      data:i
    })

    dialogRef.afterClosed().subscribe(result=>{
      console.log("closed"+result);
    })
  }
}
