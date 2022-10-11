import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarRoutes } from './car.routing';
import { CarAddComponent } from './car-add/car-add.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarsComponent } from './cars/cars.component';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CarRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule

  ],
  declarations: [
    CarAddComponent,
    CarDetailComponent,
    CarsComponent
  ]
})

export class CarModule {}