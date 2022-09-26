import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims';
import { Rental } from 'src/app/models/rental';
import { RentalDetails } from 'src/app/models/rentalDetails';
import { Rentals } from 'src/app/models/rentals';
import { AuthService } from 'src/app/services/authService/auth.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-user-rentals',
  templateUrl: './user-rentals.component.html',
  styleUrls: ['./user-rentals.component.css']
})
export class UserRentalsComponent implements OnInit {
  rentals:RentalDetails[] = [];
  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};
  constructor(
    private rentalService:RentalService,
    private authService:AuthService

    ) { }

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
    })
  }

}
