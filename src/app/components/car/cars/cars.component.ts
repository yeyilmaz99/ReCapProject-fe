import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { FilterModel } from 'src/app/models/filterModel';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterText: string = '';
  cars: Car[] = [];
  length: number = this.cars.length;
  pageSize = 10;
  brands: Brand[];
  colors: Color[];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataLoaded: boolean = false;
  carFilterForm: FormGroup;
  brandId:number = 0;
  carsSlice: Car[];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService,
    private orderByPipe:OrderByPipe
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.createCarFilterForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.brandId = params['brandId'];
        this.getCarsByBrand(params['brandId']);
      }else{
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.carsSlice = this.cars.slice(0,12);
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

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      if(this.cars.length == 0){
        this.getCars();
        this.toastrService.error("There are no cars in this brand yet");
      }
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
  paginatorLength(){
    return this.cars.length
  }

  sortAll(){
    this.cars = this.orderByPipe.transform(this.cars, 'carId', 'asc')
    this.carsSlice = this.cars.slice(0,12)
    this.paginator.firstPage();
  }
  sortLow(){
    this.cars = this.orderByPipe.transform(this.cars, 'dailyPrice', 'asc')
    this.carsSlice = this.cars.slice(0,12)
    this.paginator.firstPage();
  }
  sortHigh(){
    this.cars = this.orderByPipe.transform(this.cars, 'dailyPrice', 'desc')
    this.carsSlice = this.cars.slice(0,12)
    this.paginator.firstPage();
  }
}
