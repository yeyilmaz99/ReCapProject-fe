import { Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { CarAddComponent } from './car-add/car-add.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarsComponent } from './cars/cars.component';




export const CarRoutes:Routes = [
    {path:  "car/:carId", component:CarDetailComponent},
    {path:  "add", component:CarAddComponent},
    {path: "", pathMatch:"full", component:CarsComponent}
]