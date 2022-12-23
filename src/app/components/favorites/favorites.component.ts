import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Claims } from 'src/app/models/claims';
import { Favorite } from 'src/app/models/favorite';
import { AuthService } from 'src/app/services/authService/auth.service';
import { FavoriteService } from 'src/app/services/favoriteService/favorite.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};
  dataLoaded:boolean = false;


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
      this.dataLoaded = true;
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

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to remove this car from favorites?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Removed from your favorites',
          'success'
        )
        let favoriteToDelete:Favorite = {brandName:"",carName:"",carId:carId,colorName:"",dailyPrice:0,description:"",userId:this.claims.userId,userName:""}
        this.favoriteService.deleteFromFavorites(favoriteToDelete).subscribe(response=>{
          this.toastrService.error(response.message,"Deleted From Favorites")
          this.getFavoritesByUserId();
        },responseError=>{
          this.toastrService.error(responseError.error.message);
        })
      }

    })



  }


  checkFavorites(){
    if(this.favorites.length < 1 ){
      let element = document.querySelector(".favorites");
      element.innerHTML = "You dont have any favorites yet"
    }
  }
}
