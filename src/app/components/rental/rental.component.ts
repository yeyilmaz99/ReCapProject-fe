import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/carService/car.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Rent } from 'src/app/models/rentModel';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { Claims } from 'src/app/models/claims';
import { AuthService } from 'src/app/services/authService/auth.service';
import { RentalDetails } from 'src/app/models/rentalDetails';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: RentalDetails[] = [];
  dataLoaded: boolean = false;
  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};
  constructor(
    private rentalService: RentalService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.getClaims();
    this.getRentals();
  }

  getClaims(){
    if(this.authService.isAuthenticated()){
      let claims:Claims | undefined = this.authService.getClaims();
      this.claims = claims;
    }
  }


  getRentals(){
    this.rentalService.getRentalsByUserId(this.claims.userId).subscribe(response =>{
      this.rentals = response.data
      this.dataLoaded = true;
      this.checkRentals();
    })
  }

  checkRentals(){
    if(this.rentals.length < 1){
      let element = document.querySelector(".rentals");
      element.innerHTML = "You dont have any rentals yet"
    }
  }

}
