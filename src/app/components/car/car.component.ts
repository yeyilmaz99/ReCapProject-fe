import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/carService/car.service';
import { PageEvent } from '@angular/material/paginator';

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
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataLoaded: boolean = false;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
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
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
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
}
