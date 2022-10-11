import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorRoutes } from './color.routing';
import { ColorAddComponent } from './color-add/color-add.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ColorRoutes),
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    ColorAddComponent
  ]
})

export class ColorModule {}