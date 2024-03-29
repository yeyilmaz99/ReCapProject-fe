import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Claims } from 'src/app/models/claims';
import { Findeks } from 'src/app/models/findeks';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { Rent } from 'src/app/models/rentModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/authService/auth.service';
import { CarService } from 'src/app/services/carService/car.service';
import { FindeksService } from 'src/app/services/findeksService/findeks.service';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';
import { UserService } from 'src/app/services/userService/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  


const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  userFindeksPoint:number = 0;
  rentals: Rental[] = [];
  dataLoaded: boolean = false;
  car: Car;
  carId: number;
  carImages: CarImage[] = [];
  returnDate:Date = null;
  paymentForm:FormGroup;
  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};


  campaignOne: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private paymentService:PaymentService,
    private authService:AuthService,
    private findeksService:FindeksService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
        this.getCarDetailsByCarId(params['carId']);
        this.getCarImagesByCarId(params['carId']);
        this.rentalService.checkIfCarIsReturned(params['carId']).subscribe(response =>{
        },responseError=>{
          this.toastrService.error(responseError.error.message)
          this.router.navigate(['/cars']);
        })

      }
    });
    this.datePicker();
    this.createPaymentForm();
    this.getClaims();
  }

  getClaims(){
    if(this.authService.isAuthenticated()){
      let claims:Claims | undefined = this.authService.getClaims();
      this.claims = claims;
      this.getUsersFindeksPoint();
    }
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
      carId: [this.carId, Validators.required],
    });
  }


  rentACar() {
    if (this.campaignOne.valid) {
      let rent: Rent = Object.assign({}, this.campaignOne.value);
      rent.userId = this.claims.userId;
      this.rentalService.addRental(rent).subscribe(
        (response) => {
          Swal.fire(response.message,'','success');
          this.checkIfAlreadyExists();
          this.router.navigate(['/user/rentals'])
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
        this.toastrService.success("Payment Successful");
        this.rentACar();
        
      },
      (responseError)=> {
        this.toastrService.error(responseError.error.message);
      }
      )
    }
  }

  getUsersFindeksPoint(){
    this.findeksService.getByUserId(this.claims.userId).subscribe(response=>{
      let findeksPoint:number;
      findeksPoint = response.data.findeksPoint ;
      this.userFindeksPoint = findeksPoint;
    })
  }



  checkIfAlreadyExists(){
    this.findeksService.checkIfAlreadyExists(this.claims.userId).subscribe(response => {
      this.updateFindeksPoint();
    },responseError => {
      this.addFindeksPoint();
    })
  }

  updateFindeksPoint(){
    let findeks:Findeks = {userId:this.claims.userId,id:0,findeksPoint:0};
    this.getUsersFindeksPoint();
    findeks.findeksPoint = this.userFindeksPoint + 100;
    this.findeksService.updateFindeks(findeks).subscribe(response =>{
      this.toastrService.success("You got 100 more findeks point", "Nice!");
    },responseError =>{
      this.toastrService.error("Failed to update your findeks point");
    })
  }

  addFindeksPoint(){
    let findeks:Findeks = {userId:this.claims.userId,id:0,findeksPoint:0};
    findeks.findeksPoint = 100;
    this.findeksService.addFindeks(findeks).subscribe(response => {
      this.toastrService.success("You got 100 findeks point", "Nice!");
      let userToUpdate:User = {id:this.claims.userId,firstName:"",lastName:"",email:"",status:true};
      this.userService.updateUser(userToUpdate).subscribe(response  =>{
        this.toastrService.success("You're a active user now", "Nice!");
      },responseError => {
        this.toastrService.error("Failed to update status");
      })
    },responseError => {
      this.toastrService.error("Failed to update your findeks point");
    })
  }








}
