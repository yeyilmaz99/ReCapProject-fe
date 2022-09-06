import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.getClaims();
  }
  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};



  isLoggedIn(): boolean{
    if(this.authService.isAuthenticated() == true){
      return true;

    }else{
      return false;
    }
  }

  getClaims(){
    if(this.isLoggedIn()){
      let claims:Claims | undefined = this.authService.getClaims();
      this.claims = claims;
    }
  }


}
