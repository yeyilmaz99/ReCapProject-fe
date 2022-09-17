import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-user-rentals',
  templateUrl: './user-rentals.component.html',
  styleUrls: ['./user-rentals.component.css']
})
export class UserRentalsComponent implements OnInit {

  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.rentalService.getRentals()
  }

}
