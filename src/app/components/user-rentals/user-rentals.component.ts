import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { Rentals } from 'src/app/models/rentals';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-user-rentals',
  templateUrl: './user-rentals.component.html',
  styleUrls: ['./user-rentals.component.css']
})
export class UserRentalsComponent implements OnInit {
  rentals:Rental[] = [];

  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals(){
    this.rentalService.getAllRentals().subscribe((response)=>{
      this.rentals = response.data
      console.log(response.data);
    })
  }
}
