import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/login';
import { RegisterModel } from 'src/app/models/register';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Claims } from 'src/app/models/claims';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44345/api/Auth/'
  constructor(private httpClient:HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }


  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      this.getClaims()
      return true;
    }
    else{
      return false;
    }
  }
  getClaims(){
    let token = this.getToken();
    if(token != null){
      let tokenDetails = Object.entries(this.jwtHelper.decodeToken(token))
      console.log(tokenDetails);
      let claims : Claims = new Claims;
      tokenDetails.forEach(detail => {
        switch(detail[0]){
          case "email": {
            claims.email = String(detail[1]);
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":{
            claims.userId = Number(detail[1])
          }
        }
      })
        
      
    }
  }

  getToken(){
    return localStorage.getItem("token");
  }



}
