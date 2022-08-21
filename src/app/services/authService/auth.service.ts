import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/login';
import { RegisterModel } from 'src/app/models/register';
import { SignleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44345/api/Auth/'
  constructor(private httpClient:HttpClient) { }



  login(loginModel:LoginModel):Observable<SignleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "login";
    return this.httpClient.post<SignleResponseModel<TokenModel>>(newPath,loginModel);
  }

  register(registerModel:RegisterModel):Observable<SignleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "register";
    return this.httpClient.post<SignleResponseModel<TokenModel>>(newPath,registerModel);
  }

}
