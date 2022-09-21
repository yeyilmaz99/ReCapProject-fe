import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from 'src/app/models/favorite';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  apiUrl = "https://localhost:44345/api/Favorites/"
  constructor(private httpClient:HttpClient) { }

  getFavorites(userId:number):Observable<ListResponseModel<Favorite>>{
    let newPath = this.apiUrl + "getfavoritesbyuserid?id="
    return this.httpClient.get<ListResponseModel<Favorite>>(newPath+userId);
  }
}
