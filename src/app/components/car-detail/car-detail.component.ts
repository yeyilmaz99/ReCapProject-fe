import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/carService/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  car: Car;
  carImages: CarImage[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
        this.getCarImagesByCarId(params['carId']);
      }
    });
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      console.log(this.carImages[0].carId)
    });
  }
}
