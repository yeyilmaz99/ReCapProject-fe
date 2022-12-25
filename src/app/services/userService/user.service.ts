import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { ActiveUser } from 'src/app/models/activeUser';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  apiUrl = "https://localhost:5001/api/Users/"


  getActiveUsers():Observable<ListResponseModel<ActiveUser>>{
    let newPath = this.apiUrl + "getallfindeks"
    return this.httpClient.get<ListResponseModel<ActiveUser>>(newPath);
  }

  getAllUsers():Observable<ListResponseModel<User>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }



}
