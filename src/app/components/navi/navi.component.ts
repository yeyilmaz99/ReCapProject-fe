import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Claims } from 'src/app/models/claims';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.getClaims();
  }
  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};



  isLoggedIn(): boolean{
    return this.authService.isAuthenticated();
  }

  getClaims(){
    if(this.isLoggedIn()){
      let claims:Claims | undefined = this.authService.getClaims();
      this.claims = claims;
    }
  }
  logOut(){
    this.authService.logOut();
    this.router.navigate(['']);
    this.toastrService.info("Successfully Logged Out");
  }
  isAdmin(){
  return this.authService.isAdmin();
  }


}
