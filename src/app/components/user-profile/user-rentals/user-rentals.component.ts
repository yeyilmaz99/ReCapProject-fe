import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims';
import { RentalDetails } from 'src/app/models/rentalDetails';
import { AuthService } from 'src/app/services/authService/auth.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-user-rentals',
  templateUrl: './user-rentals.component.html',
  styleUrls: ['./user-rentals.component.css']
})
export class UserRentalsComponent implements OnInit {
  dataLoaded:boolean= false;
  rentals:RentalDetails[] = [];
  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};
  constructor(
    private rentalService:RentalService,
    private authService:AuthService

    ) { }

  ngOnInit(): void {
    this.getClaims();
    this.getRecentRentals();
  }

  getClaims(){
    if(this.authService.isAuthenticated()){
      let claims:Claims | undefined = this.authService.getClaims();
      this.claims = claims;
    }
  }

  // getRentals(){
  //   this.rentalService.getRentalsByUserId(this.claims.userId).subscribe(response =>{
  //     this.rentals = response.data
  //     this.dataLoaded = true;
  //     this.checkRentals();
  //   })
  // }

  getRecentRentals(){
    this.rentalService.getRecentRentalsByUserId(this.claims.userId).subscribe(response=>{
      this.rentals = response.data
      this.dataLoaded = true;
      this.checkRentals();
    })
  }

  checkRentals(){
    if(this.rentals.length < 1){
      let element = document.querySelector(".rentals");
      element.innerHTML = "You dont have any rentals yet"
    }
  }






}
