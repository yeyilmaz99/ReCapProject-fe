import { Routes } from '@angular/router';

import { UserCompanyComponent } from './user-company/user-company.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';    


export const UserRoutes:Routes = [
    {path: 'companysettings', component:UserCompanyComponent},
    {path: 'info', component:UserInfoComponent},
    {path: 'settings', component:UserSettingsComponent},
]