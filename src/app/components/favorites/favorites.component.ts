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
    })
  }

  getClaims(){
    if(this.authService.isAuthenticated()){
      let claims:Claims | undefined = this.authService.getClaims();
      this.claims = claims;
    }
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
