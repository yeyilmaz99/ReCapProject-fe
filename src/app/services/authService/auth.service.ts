import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/login';
import { RegisterModel } from 'src/app/models/register';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Claims } from 'src/app/models/claims';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:5001/api/Auth/'
  constructor(
    private httpClient:HttpClient, 
    private jwtHelper: JwtHelperService,
    private localStorageService:LocalStorageService

    ) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }


  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }

  logOut(){
    this.localStorageService.deleteItem("token")
  }
  
  getToken(){
    return this.localStorageService.getItem("token");
  }

  isAuthenticated(){
    if(this.getToken()){
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
      let claims : Claims = new Claims;
      tokenDetails.forEach(detail => {
        switch(detail[0]){
          case "email": {
            claims.email = String(detail[1]);
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":{
            claims.userId = Number(detail[1])
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name":{
            claims.fullName = String(detail[1]);
            break;
          }
          case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role":{
            claims.roles = detail[1] as Array<string>
            break;
          }
        }
      });
      if(!claims.roles){
        claims.roles = [];
      }
      return claims
  
    }
    return undefined
  }

  

  isAdmin():boolean{
    let claims:Claims | undefined = this.getClaims();
    if(claims.roles.includes("admin")){
      return true
    }else{
      return false
    }
  }

}
