import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  username:String,
  email:String,
  password:String,
  friendList:[],
  friendRequest:[],
  image:String,
  bio:String
}

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})

export class DialogboxComponent implements OnInit {

  userdata:any;
  dat:any=[];
  result:any=[];
  constructor(public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private http:HttpClient) { }

  ngOnInit(): void {
    const token =localStorage.getItem("user");
    console.log(token);

    if (token) {
      this.userdata = token.split(".")[1];
      this.userdata = window.atob(this.userdata);
      this.userdata=JSON.parse(this.userdata);

    }
    console.log(this.userdata);

    for(let i=0;i<this.userdata.user.friendList.length;i++){
      for(let j=0;j<this.data.friendList.length;j++){
        if(this.userdata.user.friendList[i]==this.data.friendList[j])
          this.dat.push(this.data.friendList[j])
      }
    }

    for(let i=0;i<this.dat.length;i++){
      this.http.get('https://social-media-task-backend.vercel.app/users/get/'+this.dat[i]).subscribe((ans:any)=>{
        this.result.push(ans);

      })
    }


  }

  onNoClick(){
    this.dialogRef.close();
  }
}
