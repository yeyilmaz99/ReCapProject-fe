import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44345/api/Brands/";
  constructor(private httpClient: HttpClient) { }


  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"getall");
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",brand)
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.patch<ResponseModel>(this.apiUrl+"update",brand);
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl+"delete");
  }


}
