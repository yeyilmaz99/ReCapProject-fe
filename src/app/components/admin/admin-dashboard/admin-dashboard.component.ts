import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarService } from 'src/app/services/carService/car.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  cars:Car[] = [];
  rentals:Rental[] = [];
  users:User[] = [];
  brands:Brand[] = [];
  usersDataLoaded:boolean = false;
  rentalsDataLoaded:boolean = false;
  carsDataLoaded:boolean = false;
  brandsDataLoaded:boolean = false;
  constructor(
    private rentalService:RentalService,
    private carService:CarService,
    private userService:UserService,
    private brandService:BrandService
  ) { }

  ngOnInit(): void {
    this.getCars();
    this.getRentals();
    this.getUsers();
    this.getBrands();
  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.carsDataLoaded = true;
    })
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data
      this.rentalsDataLoaded = true;
    })
  }

  getUsers(){
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
      this.usersDataLoaded = true;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data;
      this.brandsDataLoaded = true;
    })
  }

}
