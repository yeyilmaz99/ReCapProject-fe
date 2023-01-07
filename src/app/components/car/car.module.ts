import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarRoutes } from './car.routing';
import { CarAddComponent } from './car-add/car-add.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarsComponent } from './cars/cars.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RentalComponent } from './rentacar/rental.component';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CarRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule

  ],
  declarations: [
    CarAddComponent,
    CarDetailComponent,
    CarsComponent,
    RentalComponent,
    FilterPipe
  ]
})

export class CarModule {}