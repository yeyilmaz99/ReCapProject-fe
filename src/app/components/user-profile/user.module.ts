import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutes } from './user.routing';
import { UserRentalsComponent } from './user-rentals/user-rentals.component';
import { UserCompanyComponent } from './user-company/user-company.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserInfoComponent } from './user-info/user-info.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { FavoritesComponent } from '../favorites/favorites.component';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';





@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule

  ],
  declarations: [
    UserRentalsComponent,
    UserCompanyComponent,
    UserSettingsComponent,
    UserInfoComponent,
    UserFavoritesComponent
  ]
})

export class UserModule {}