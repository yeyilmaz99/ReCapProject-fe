import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-admin-rental-list',
  templateUrl: './admin-rental-list.component.html',
  styleUrls: ['./admin-rental-list.component.css']
})
export class AdminRentalListComponent implements OnInit {
  rentals:Rental[] = [];
  dataLoaded:boolean = false;
  constructor(
    private rentalService:RentalService
  ) { }

  ngOnInit(): void {
    this.getRentals()
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data
      this.dataLoaded = true;
    })
  }

}
