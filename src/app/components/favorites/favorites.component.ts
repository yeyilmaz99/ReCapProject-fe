import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Claims } from 'src/app/models/claims';
import { Favorite } from 'src/app/models/favorite';
import { AuthService } from 'src/app/services/authService/auth.service';
import { FavoriteService } from 'src/app/services/favoriteService/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};


  constructor(
    private favoriteService:FavoriteService,
    private toastrService:ToastrService,
    private authService:AuthService
    ) { }
  favorites:Favorite[] = []

  ngOnInit(): void {
    this.getClaims();
    this.getFavoritesByUserId();
  }


  getFavoritesByUserId(){
    this.favoriteService.getFavorites(this.claims.userId).subscribe(response => {
      this.favorites = response.data;
      this.checkFavorites();
    })
  }

  getClaims(){
    if(this.authService.isAuthenticated()){
      let claims:Claims | undefined = this.authService.getClaims();
      this.claims = claims;
    }
  }

  deleteFromFavorites(carId:number){
    let favoriteToDelete:Favorite = {brandName:"",carName:"",carId:carId,colorName:"",dailyPrice:0,description:"",userId:this.claims.userId,userName:""}
    this.favoriteService.deleteFromFavorites(favoriteToDelete).subscribe(response=>{
      this.toastrService.error(response.message,"Deleted From Favorites")
    },responseError=>{
      this.toastrService.error(responseError.error.message);
    })
    this.getFavoritesByUserId();
  }


  checkFavorites(){
    if(this.favorites.length < 1 ){
      let element = document.querySelector(".favorites");
      element.innerHTML = "You dont have any favorites yet"
    }
  }
}
