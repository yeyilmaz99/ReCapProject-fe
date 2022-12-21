import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDelete } from 'src/app/models/carDelete';
import { CarFindeks } from 'src/app/models/carFindeks';
import { CarImage } from 'src/app/models/carImage';
import { Claims } from 'src/app/models/claims';
import { Color } from 'src/app/models/color';
import { Favorite } from 'src/app/models/favorite';
import { AuthService } from 'src/app/services/authService/auth.service';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';
import { FavoriteService } from 'src/app/services/favoriteService/favorite.service';
import { FindeksService } from 'src/app/services/findeksService/findeks.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carFindeks:number;
  findeksPoint:number;
  car: Car;
  carImages: CarImage[] = [];
  brands:Brand[];
  colors:Color[];
  updateForm:FormGroup;
  carId:number;
  edit:Boolean =false;
  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};
  checkIfAlreadyAddedToFav:boolean = false;
  checkIfCarIsReturnedClass:boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router:Router,
    private brandService:BrandService,
    private colorService:ColorService,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private favoriteService:FavoriteService,
    private findeksService:FindeksService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
        this.getCarDetailsByCarId(params['carId']);
        this.getCarImagesByCarId(params['carId']);
      }
    });
    this.getBrands();
    this.getColors();
    this.createUpdateForm();
    this.checkIfCarIsReturned();
    this.getClaims();
    this.checkIfAlreadyAddedToFavs();
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.car = response.data;
      this.carFindeks = response.data.findeksPoint;
      this.getFindeksPoint();
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }


  checkIfCarIsReturned(){
    this.rentalService.checkIfCarIsReturned(this.carId).subscribe(response => {
      this.checkIfCarIsReturnedClass = response.success;
    },responseError => {
      this.checkIfCarIsReturnedClass = false;
      this.toastrService.error(responseError.error.message)
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      carName: ["",Validators.required],
      colorId: ["",Validators.required],
      brandId: ["",Validators.required],
      modelYear: ["",Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["",Validators.required],
      findeksPoint: ["",Validators.required],
    })
  }
  update(){
    if(this.updateForm.valid){
      let carToUpdate = Object.assign({},this.updateForm.value);
      carToUpdate.Id = this.carId;
      this.carService.updateCar(carToUpdate).subscribe(response => {
        this.toastrService.success(response.message)
        this.getCarDetailsByCarId(this.carId);
      })
    }
  }
  editForm(){
    this.edit = true;
  }

  delete(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        let carToDelete: CarDelete = {id:this.carId,brandId:0,carName:'',colorId:0,dailyPrice:0,description:'',modelYear:0}
        this.carService.deleteCar(carToDelete).subscribe(response => {
          this.toastrService.warning(response.message)
        })
        this.router.navigate(['cars'])
      }
    })
  }

  isAdmin():boolean{
    if(this.isLoggedIn()){
      return this.authService.isAdmin()
    }
    return false;
  }

  getClaims(){
    if(this.isLoggedIn()){
      let claims:Claims | undefined = this.authService.getClaims();
      this.claims = claims;
    }
  }

  isLoggedIn(){
    return this.authService.isAuthenticated();
  }

  addToFavorites(){
    let newFavorite:Favorite = {brandName:"",carName:"",carId:this.carId,colorName:"",dailyPrice:0,description:"",userId:this.claims.userId,userName:""}
    this.favoriteService.addToFavorites(newFavorite).subscribe(response =>{
      this.toastrService.success(response.message,"Added To Favorites");
    },responseError =>{
      this.toastrService.error(responseError.error.message);
    })

    this.checkIfAlreadyAddedToFav = false;
  }

  checkIfAlreadyAddedToFavs(){
    this.favoriteService.checkIfAlreadyAddedToFavs(this.carId,this.claims.userId).subscribe(response=>{
      this.checkIfAlreadyAddedToFav = response.success;
    },responseError => {
      this.checkIfAlreadyAddedToFav = responseError.error.success;
    })
  }

  deleteFromFavorites(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        let favoriteToDelete:Favorite = {brandName:"",carName:"",carId:this.carId,colorName:"",dailyPrice:0,description:"",userId:this.claims.userId,userName:""}
        this.favoriteService.deleteFromFavorites(favoriteToDelete).subscribe(response=>{
          this.toastrService.error(response.message,"Deleted From Favorites")
        },responseError=>{
          this.toastrService.error(responseError.error.message);
        })
        this.checkIfAlreadyAddedToFav = true;
      }
    })






  }

  getFindeksPoint(){
    console.log(this.carFindeks, this.claims.userId);
      this.findeksService.checkIfFindeksSufficient(this.car.findeksPoint,this.claims.userId).subscribe(response => {
        this.toastrService.show(response.message);
      },responseError =>{
        console.log(responseError.error.success)
        if(!responseError.error.success){
          Swal.fire({
            title: 'Are you sure?',
            text: "You Dont have enough Findeks Point. Do you still want to rent this car with insurance for 250$ extra?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isDismissed) {
              Swal.fire(
                'OK!',
                'Please select another car.',
                'error'
              )
              this.router.navigate(['cars'])
            }
          })
        }
      })
  }
}