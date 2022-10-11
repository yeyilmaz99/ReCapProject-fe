import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/carService/car.service';
import { PageEvent } from '@angular/material/paginator';
import { ColorService } from 'src/app/services/colorService/color.service';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { FilterModel } from 'src/app/models/filterModel';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {

  constructor(
  ) {}

  ngOnInit(): void {
  }


}
