import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarFindeks } from 'src/app/models/carFindeks';
import { Findeks } from 'src/app/models/findeks';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = "https://localhost:5001/api/";


  getAll():Observable<ListResponseModel<Findeks>>{
    let newPath = this.apiUrl + "Findeks/getall";
    return this.httpClient.get<ListResponseModel<Findeks>>(newPath);
  }

  getByUserId(userId:number):Observable<SingleResponseModel<Findeks>>{
    let newPath = this.apiUrl + "Findeks/getByUserId?userId=";
    return this.httpClient.get<SingleResponseModel<Findeks>>(newPath + userId);
  }

  getAllCarFindeks():Observable<ListResponseModel<CarFindeks>>{
    let newPath = this.apiUrl + "CarFindeks/getall";
    return this.httpClient.get<ListResponseModel<CarFindeks>>(newPath);
  }

  getCarFindeksById(carId:number):Observable<SingleResponseModel<CarFindeks>>{
    let newPath = this.apiUrl + "CarFindeks/getbyid?carId=";
    return this.httpClient.get<SingleResponseModel<CarFindeks>>(newPath + carId);
  }

  checkIfFindeksSufficient(){

  }



}
