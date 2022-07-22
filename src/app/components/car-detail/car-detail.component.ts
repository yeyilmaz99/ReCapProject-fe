import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { Rental } from 'src/app/models/rental';
import { Rent } from 'src/app/models/rentModel';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  car: Car;
  carImages: CarImage[] = [];
  brands:Brand[];
  colors:Color[];
  updateForm:FormGroup;
  carId:number;
  edit:Boolean =false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router:Router,
    private brandService:BrandService,
    private colorService:ColorService,
    private formBuilder:FormBuilder
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


  checkIfCarIsReturned(){
    this.rentalService.checkIfCarIsReturned(this.carId).subscribe(response => {
      this.router.navigate(["cars/car/"+this.carId+"/rental"])
    },responseError => {
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
      description: ["",Validators.required]
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



}
