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

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  length: number = this.cars.length;
  carsSlice: Car[];
  pageSize = 10;
  brands: Brand[];
  colors: Color[];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataLoaded: boolean = false;
  carFilterForm: FormGroup;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private brandService: BrandService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
    this.getColors();
    this.getBrands();
    this.createCarFilterForm();
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(categoryId: number) {
    this.carService.getCarsByBrand(categoryId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.cars.length) {
      endIndex = this.cars.length;
    }
    this.carsSlice = this.cars.slice(startIndex, endIndex);
  }

  createCarFilterForm() {
    this.carFilterForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      brandId: ['', Validators.required],
    });
  }
  filter() {
    if (this.carFilterForm.valid) {
      let filterModel: FilterModel = Object.assign(
        {},
        this.carFilterForm.value
      );
      this.carService
        .getCarsByBrandAndColorId(filterModel.colorId, filterModel.brandId)
        .subscribe((response) => {
          this.cars = response.data;
        });
    } else {
    }
  }
}
