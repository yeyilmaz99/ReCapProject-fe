import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutes } from './admin.routing';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';   
import { AdminCarListComponent } from './components/admin-car-list/admin-car-list.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    AdminDashboardComponent,
    AdminCarListComponent
  ]
})

export class AdminModule {}