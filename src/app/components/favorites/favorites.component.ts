import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Favorite } from 'src/app/models/favorite';
import { FavoriteService } from 'src/app/services/favoriteService/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(
    private favoriteService:FavoriteService,
    private toastrService:ToastrService
    ) { }
  favorites:Favorite[] = []

  ngOnInit(): void {
    this.getFavoritesByUserId();
  }


  getFavoritesByUserId(userId:number = 1002){
    this.favoriteService.getFavorites(userId).subscribe(response => {
      this.favorites = response.data;
    })
  }


  deleteFromFavorites(){
    let favoriteToDelete:Favorite = {brandName:"",carName:"",carId:0,colorName:"",dailyPrice:0,description:"",userId:0,userName:""}
    this.favoriteService.deleteFromFavorites(favoriteToDelete).subscribe(response=>{
      this.toastrService.error(response.message,"Deleted From Favorites")
    },responseError=>{
      this.toastrService.error(responseError.error.message);
    })

  }


}
