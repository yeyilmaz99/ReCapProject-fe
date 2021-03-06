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

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  dataLoaded: boolean = false;
  car: Car;
  carId: number;
  carImages: CarImage[] = [];
  returnDate = null;
  paymentForm:FormGroup;


  campaignOne: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private paymentService:PaymentService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
        this.getCarDetailsByCarId(params['carId']);
        this.getCarImagesByCarId(params['carId']);

      }
    });
    this.datePicker();
    this.createPaymentForm();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
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
    });
  }

  datePicker() {
    this.campaignOne = this.formBuilder.group({
      rentDate: [new Date(year, month, today.getDate()), Validators.required],
      returnDate: [this.returnDate],
      customerId: [1, Validators.required],
      carId: [this.carId, Validators.required],
    });
  }


  rentACar() {
    if (this.campaignOne.valid) {
      console.log(this.campaignOne.value)
      let rent: Rent = Object.assign({}, this.campaignOne.value);
      this.rentalService.addRental(rent).subscribe(
        (response) => {

        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    }
  }



  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardName: ['',Validators.required],
      cardNumber: ['',Validators.required],
      expirationDate: ['',Validators.required],
      securityCode: ['',Validators.required]
    });
  }

  payment(){
    if (this.paymentForm.valid){
      let payment:Payment = Object.assign({},this.paymentForm.value);
      this.paymentService.add(payment).subscribe( (response) => {
        this.toastrService.success(response.message,"Ara?? Ba??ar??yla Kiraland??");
        this.rentACar();
        
      },
      (responseError)=> {
        this.toastrService.error(responseError.error.message);
      }
      )
    }
  }






}
