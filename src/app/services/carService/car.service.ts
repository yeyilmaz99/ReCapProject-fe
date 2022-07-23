import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Car } from 'src/app/models/car';
import { ResponseModel } from 'src/app/models/responseModel';
import { SignleResponseModel } from 'src/app/models/singleResponseModel';
import { CarImage } from 'src/app/models/carImage';
import { FilterModel } from 'src/app/models/filterModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44345/api/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'Cars/getcarsdetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'Cars/getbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'Cars/getbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetailsByCarId(carId: number): Observable<SignleResponseModel<Car>> {
    let newPath = this.apiUrl + 'Cars/getcardetails?carId=' + carId;
    return this.httpClient.get<SignleResponseModel<Car>>(newPath);
  }
  getCarImagesByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'CarImages/getall?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  getCarsByBrandAndColorId(colorId:number,brandId:number):Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl+"Cars/getbybrandidandcolorid?colorId="+colorId+"&brandId="+brandId);
  }
  addCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Cars/add",car)
  }
  updateCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.patch<ResponseModel>(this.apiUrl+"Cars/update",car)
  }
  deleteCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl+"Cars/delete");
  }
}
