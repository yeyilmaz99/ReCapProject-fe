import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Car } from 'src/app/models/car';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44345/api/Cars/getcardetails";

  constructor(private httpClient: HttpClient ) { }


  getCars():Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
  }
}
