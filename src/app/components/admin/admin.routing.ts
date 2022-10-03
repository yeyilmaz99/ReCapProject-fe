import { Routes } from '@angular/router';

import { AdminCarListComponent } from './admin-car-list/admin-car-list.component'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


export const AdminRoutes:Routes = [
    {path: 'dashboard', component:AdminDashboardComponent},
    {path: 'car-list', component:AdminCarListComponent}
]