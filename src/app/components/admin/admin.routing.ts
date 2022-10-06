import { Routes } from '@angular/router';

import { AdminCarListComponent } from './admin-car-list/admin-car-list.component'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRentalListComponent } from './admin-rental-list/admin-rental-list.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';


export const AdminRoutes:Routes = [
    {path: 'dashboard', component:AdminDashboardComponent},
    {path: 'car-list', component:AdminCarListComponent},
    {path: 'user-list', component:AdminUserListComponent},
    {path: 'rental-list', component:AdminRentalListComponent}
]