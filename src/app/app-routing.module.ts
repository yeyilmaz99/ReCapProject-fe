import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AdminComponent } from './components/admin/admin.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorComponent } from './components/color/color.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:  "", pathMatch:"full", component:HomeComponent},
  {
    path: 'cars',
    component: CarComponent,
    children: [{
      path: '',
      loadChildren: () => import('./components/car/car.module').then(m => m.CarModule)
    }]
  },
  {path: "color",redirectTo:"color/settings", pathMatch:"full"},
  {
    path: 'color',
    component: ColorComponent,
    children: [{
      path: '',
      loadChildren: () => import('./components/color/color.module').then(m => m.ColorModule)
    }],
    canActivate:[LoginGuard]
  },
  {path:  "user/rentals", component:RentalComponent, canActivate:[LoginGuard]},
  {path:  "about", component:AboutUsComponent},
  {path:  "contact", component:ContactUsComponent},
  {path:  "login", component:LoginComponent},
  {path:  "register", component:RegisterComponent},
  {path: "favorites", component:FavoritesComponent, canActivate:[LoginGuard]},
  {path:'admin',redirectTo:'admin/dashboard',pathMatch:'full'},
  {
    path: 'admin',
    component: AdminComponent,
    children: [{
      path: '',
      loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
    }],
    canActivate:[LoginGuard]
  },
  {path:'user',redirectTo:'user/info',pathMatch:'full'},
  {
    path: 'user',
    component: UserProfileComponent,
    children: [{
      path: '',
      loadChildren: () => import('./components/user-profile/user.module').then(m => m.UserModule)
    }],
    canActivate:[LoginGuard]
  },
  {
    path: 'brand',
    component: BrandComponent,
    children: [{
      path: '',
      loadChildren: () => import('./components/brand/brand.module').then(m => m.BrandModule)
    }]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
