import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrandRoutes } from './brand.routing';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { BrandsComponent } from './brands/brands.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BrandRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,

  ],
  declarations: [
    BrandAddComponent,
    BrandsComponent,

  ]
})

export class BrandModule {}