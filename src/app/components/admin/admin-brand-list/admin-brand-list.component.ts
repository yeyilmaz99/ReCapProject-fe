import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-admin-brand-list',
  templateUrl: './admin-brand-list.component.html',
  styleUrls: ['./admin-brand-list.component.css']
})
export class AdminBrandListComponent implements OnInit {
  brands:Brand[] = [];
  dataLoaded:boolean = false;
  brandToDelete:Brand = {brandId:0, brandName:''};
  constructor(
    private brandService:BrandService,
    private toastrService:ToastrService,
    ) { }

  ngOnInit(): void {
    this.getBrands();
  }



  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data;
      this.dataLoaded = true;
    })
  }

  delete(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.brandToDelete.brandId = id;
        this.brandService.deleteBrand(this.brandToDelete).subscribe(response => {
          this.toastrService.warning(response.message);
          this.getBrands();
        })
      }
    })
  }
}
