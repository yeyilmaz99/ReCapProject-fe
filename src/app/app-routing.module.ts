import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path: "", pathMatch:"full", component:HomeComponent},
  {path:"cars", component: CarComponent},
  {path:"cars/brand/:brandId", component: CarComponent},
  {path:"cars/color/:colorId", component: CarComponent},
  {path:"cars/car/:carId", component:CarDetailComponent},
  {path: "brand", component:BrandComponent},
  {path: "cars/car/:carId/rental", component:RentalComponent},
  {path: "about", component:AboutUsComponent},
  {path: "contact", component:ContactUsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
