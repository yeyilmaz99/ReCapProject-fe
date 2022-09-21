import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/models/favorite';
import { FavoriteService } from 'src/app/services/favoriteService/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private favoriteService:FavoriteService) { }
  favorites:Favorite[] = []

  ngOnInit(): void {
    this.getFavoritesByUserId();
  }


  getFavoritesByUserId(userId:number = 1002){
    this.favoriteService.getFavorites(userId).subscribe(response => {
      this.favorites = response.data;
    })
  }


}
