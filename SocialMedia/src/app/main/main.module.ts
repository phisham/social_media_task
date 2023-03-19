import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UsersComponent } from './main/users/users.component';
import { ProfileComponent } from './main/profile/profile.component';
import { NotificationComponent } from './main/notification/notification.component';
import { DialogboxComponent } from './main/dialogbox/dialogbox.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    MainComponent,
    SidenavComponent,
    UsersComponent,
    ProfileComponent,
    NotificationComponent,
    DialogboxComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class MainModule { }
