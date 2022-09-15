import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-user-profile-info',
  templateUrl: './user-profile-info.component.html',
  styleUrls: ['./user-profile-info.component.css']
})
export class UserProfileInfoComponent implements OnInit {

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
    }
  }

}
