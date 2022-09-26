import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental';
import { Rentals } from 'src/app/models/rentals';
import { Rent } from 'src/app/models/rentModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "https://localhost:44345/api/Rentals/";
  constructor(private httpClient: HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getrentaldetails");
  }
  addRental(rent:Rent):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",rent);
  }
  checkIfCarIsReturned(id:number):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl+"checkifcarisreturned?id="+id);
  }
  getAllRentals():Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getall");
  }

  getRentalsByUserId(userId:number):Observable<ListResponseModel<Rental>>{
    
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getrentaldetailsbyuserid?userId="+ userId);
  }

}
