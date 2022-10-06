import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  apiUrl = "https://localhost:44345/api/Users/"


  getUsers():Observable<ListResponseModel<User>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

}
