import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/login';
import { SignleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44345/api/Auth/'
  constructor(private httpClient:HttpClient) { }





}
