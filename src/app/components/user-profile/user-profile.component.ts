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

  ngOnInit(): void {
    this.getClaims();
  }

  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};
  firstName:string|undefined;
  lastName:string|undefined;


  getClaims(){
    if(this.authService.isAuthenticated()){
      let claims:Claims | undefined = this.authService.getClaims();
      this.claims = claims;
      let mySplitResult = this.claims?.fullName.split(" ");
      let lastName =  mySplitResult[mySplitResult.length-1]
      console.log(lastName)
      const lastIndexOfSpace = claims.fullName.lastIndexOf(' ');
      this.firstName = claims.fullName.substring(0, lastIndexOfSpace)
      console.log(this.firstName)
    }
  }


}
