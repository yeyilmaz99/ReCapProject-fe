import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Findeks } from 'src/app/models/findeks';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = "https://localhost:5001/api/Findeks/";


  getAll():Observable<ListResponseModel<Findeks>>{
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Findeks>>(newPath);
  }

  getByUserId(userId:number):Observable<SingleResponseModel<Findeks>>{
    let newPath = this.apiUrl + "getByUserId?userId=";
    return this.httpClient.get<SingleResponseModel<Findeks>>(newPath + userId);
  }

}
