import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';

 


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    UserSidebarComponent

  ],
  exports: [
    UserSidebarComponent
  ]
})
export class UserComponentsModule { }
