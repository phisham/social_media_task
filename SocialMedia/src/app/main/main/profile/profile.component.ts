import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userdata:any;
  profileForm:any;
  url:any;
  msg:any;
  size_err:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.profileForm=new FormGroup({
      name:new FormControl('',Validators.required),
      username:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      bio:new FormControl('',Validators.required)
    })

    const token =localStorage.getItem("user");
    console.log(token);
    if (token) {
      this.userdata = token.split(".")[1];
      this.userdata = window.atob(this.userdata);
      this.userdata=JSON.parse(this.userdata);

    }
    this.userdata=this.userdata.user;
    console.log(this.userdata)


    this.http.get('https://social-media-task-backend.vercel.app/users/get/'+this.userdata.id).subscribe((reslt:any)=>{
      this.profileForm.get('name').setValue(reslt.name);
      this.profileForm.get('username').setValue(reslt.username);
      this.profileForm.get('email').setValue(reslt.email);
      this.profileForm.get('bio').setValue(reslt.bio);
      this.url=reslt.image;
    })

  }

  nameChange(ev:any){
    this.profileForm.get('name').setValue(ev.target.value);
    console.log(this.profileForm.get('name').value);
  }
  usernameChange(ev:any){
    this.profileForm.get('username').setValue(ev.target.value);
    console.log(this.profileForm.get('username').value);
  }
  bioChange(ev:any){
    this.profileForm.get('bio').setValue(ev.target.value);
    console.log(this.profileForm.get('bio').value);
  }
  emailChange(ev:any){
    this.profileForm.get('email').setValue(ev.target.value);
    console.log(this.profileForm.get('email').value);
  }

  fileRead(event:any){
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
		}
  }

  save(ev:any){
    let d={
      name:this.profileForm.get('name').value,
      username:this.profileForm.get('username').value,
      email:this.profileForm.get('email').value,
      bio:this.profileForm.get('bio').value,
      image:this.url
    };
    (ev.target as HTMLElement).innerText="Updating..";
    (ev.target as HTMLElement).style.backgroundColor='darkgrey';
    this.http.put('https://social-media-task-backend.vercel.app/users/updateProfile/'+this.userdata.id,d).subscribe((data:any)=>{
      (ev.target as HTMLElement).innerText="Updated!!";
      (ev.target as HTMLElement).style.backgroundColor='green';
      console.log(data);

    },(err)=>{
      this.size_err=true;
    });


  }
}
