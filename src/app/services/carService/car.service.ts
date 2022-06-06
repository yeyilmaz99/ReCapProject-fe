import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarResponseModel } from '../../models/carModel/carResponseModel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44345/api/Cars/getall";

  constructor(private httpClient: HttpClient ) { }


  getCars():Observable<CarResponseModel>{
    return this.httpClient.get<CarResponseModel>(this.apiUrl);
  }
}
