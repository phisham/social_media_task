import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotificationComponent } from './main/notification/notification.component';
import { ProfileComponent } from './main/profile/profile.component';
import { UsersComponent } from './main/users/users.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      {
        path:'users',
        component:UsersComponent
      },
      {
        path:'',
        redirectTo:'users',
        pathMatch:'full'
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'notifications',
        component:NotificationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
