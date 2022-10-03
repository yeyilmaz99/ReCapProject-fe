import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.getClaims();
  }

  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};
  firstName:string|undefined = "";
  lastName:string|undefined = "";


  getClaims(){
    if(this.authService.isAuthenticated()){
      let claims:Claims | undefined = this.authService.getClaims();
      this.claims = claims;
      let mySplitResult = this.claims?.fullName.split(" ");
      this.lastName =  mySplitResult[mySplitResult.length-1];
      const lastIndexOfSpace = claims.fullName.lastIndexOf(' ');
      this.firstName = claims.fullName.substring(0, lastIndexOfSpace)
    }
  }
}
