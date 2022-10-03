import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';    


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    AdminNavbarComponent,
    AdminSidebarComponent,

  ],
  exports: [
    AdminNavbarComponent,
    AdminSidebarComponent
  ]
})
export class AdminComponentsModule { }
