import { Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { BrandsComponent } from './brands/brands.component';


export const BrandRoutes:Routes = [
    {path: "settings", component:BrandAddComponent, canActivate:[LoginGuard]},
    {path: "", pathMatch:"full", component:BrandsComponent}
]