import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDelete } from 'src/app/models/carDelete';
import { CarService } from 'src/app/services/carService/car.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-admin-car-list',
  templateUrl: './admin-car-list.component.html',
  styleUrls: ['./admin-car-list.component.css']
})
export class AdminCarListComponent implements OnInit {
  cars:Car[] = [];
  dataLoaded:boolean = false;
  carToDelete:CarDelete = {id:0,brandId:0,carName:'',colorId:0,dailyPrice:0,description:'',modelYear:0}
  constructor(
    private carService:CarService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getCars()
  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }


  delete(carToDeleteId:number){
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
        this.carToDelete.id = carToDeleteId;
        this.carService.deleteCar(this.carToDelete).subscribe(response => {
          this.toastrService.warning(response.message)
          this.getCars();
        })
      }
    })
    
  }

}
