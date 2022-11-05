import { Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { CarAddComponent } from './car-add/car-add.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarsComponent } from './cars/cars.component';
import { RentalComponent } from './rental/rental.component';




export const CarRoutes:Routes = [
    {path:  "car/:carId", component:CarDetailComponent},
    {path:  "settings", component:CarAddComponent},
    {path: "", pathMatch:"full", component:CarsComponent},
    {path:  "car/:carId/rental", component:RentalComponent, canActivate:[LoginGuard]},
]