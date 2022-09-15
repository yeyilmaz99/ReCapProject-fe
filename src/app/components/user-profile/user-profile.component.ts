import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  constructor(private authService:AuthService) { }
  userInfo = true;
  userSettings = false;
  userRentals = false;
  userCompany = false;
  enableInfo(){
    this.userInfo =true;
    this.userSettings = false;
    this.userRentals = false;
    this.userCompany = false;

  }
  enableSettings(){
    this.userInfo =false;
    this.userSettings = true;
    this.userRentals = false;
    this.userCompany = false;

  }
  enableRentals(){
    this.userInfo =false;
    this.userSettings = false;
    this.userRentals = true;
    this.userCompany = false;

  }
  enableCompany(){
    this.userInfo =false;
    this.userSettings = false;
    this.userRentals = false;
    this.userCompany = true;

  }

  ngOnInit(): void {
    this.getClaims();
  }

  activeMenu(event:any){
    event.target.classList.add("className")
  }

  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};

  getClaims(){
    if(this.authService.isAuthenticated()){
      let claims:Claims | undefined = this.authService.getClaims();
      this.claims = claims;
    }
  }


}
