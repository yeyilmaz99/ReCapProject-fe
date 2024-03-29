import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from 'src/app/models/favorite';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  apiUrl = "https://localhost:5001/api/Favorites/"
  constructor(private httpClient:HttpClient) { }

  getFavorites(userId:number):Observable<ListResponseModel<Favorite>>{
    let newPath = this.apiUrl + "getfavoritesbyuserid?id="
    return this.httpClient.get<ListResponseModel<Favorite>>(newPath+userId);
  }

  addToFavorites(favorite:Favorite):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,favorite);
  }

  checkIfAlreadyAddedToFavs(carId:number,userId:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + `checkifalreadyaddedtofavorites?carId=${carId}&userId=${userId}`
    return this.httpClient.get<ResponseModel>(newPath);
  }

  deleteFromFavorites(favoriteToDelete:Favorite):Observable<ResponseModel>{
    let newPath = this.apiUrl + "delete";
    return this.httpClient.delete<ResponseModel>(newPath , {body:favoriteToDelete})
  }
  getRecentFavoritesByUserId(userId:number):Observable<ListResponseModel<Favorite>>{
    let newPath = this.apiUrl + "getrecent?userId="
    return this.httpClient.get<ListResponseModel<Favorite>>(newPath+userId);
  }


}
