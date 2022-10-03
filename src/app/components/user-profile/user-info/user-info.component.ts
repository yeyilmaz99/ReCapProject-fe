import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims';
import { AuthService } from 'src/app/services/authService/auth.service';
import { FavoritesComponent } from '../../favorites/favorites.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

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
