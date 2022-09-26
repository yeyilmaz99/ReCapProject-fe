import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims';
import { Rental } from 'src/app/models/rental';
import { Rentals } from 'src/app/models/rentals';
import { AuthService } from 'src/app/services/authService/auth.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-user-rentals',
  templateUrl: './user-rentals.component.html',
  styleUrls: ['./user-rentals.component.css']
})
export class UserRentalsComponent implements OnInit {
  rentals:Rental[] = [];
  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};
  constructor(
    private rentalService:RentalService,
    private authService:AuthService

    ) { }

  ngOnInit(): void {
    this.getClaims();
    this.getRentals();
    console.log(this.rentals)
  }

  getClaims(){
    if(this.authService.isAuthenticated()){
      let claims:Claims | undefined = this.authService.getClaims();
      this.claims = claims;
    }
  }

  getRentals(){
    let userId = this.claims.userId;
    this.rentalService.getRentalsByUserId(userId).subscribe(response =>{
      response.data = this.rentals;
    })
  }

}
