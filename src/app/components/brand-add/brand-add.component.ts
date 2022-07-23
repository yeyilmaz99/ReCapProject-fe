import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandForm:FormGroup
  brands:Brand[];
  brandToUpdateForm:FormGroup;
  brandToDeleteForm:FormGroup;
  constructor( private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService 
    ) { }

  ngOnInit(): void {
    this.createBrandForm();
    this.getBrands();
    this.createBrandToUpdateForm();
    this.createBrandToDeleteForm();
  }


  createBrandForm(){
    this.brandForm = this.formBuilder.group({
      brandName : ["", Validators.required]
    })
  }
  createBrandToUpdateForm(){
    this.brandToUpdateForm = this.formBuilder.group({
      brandId : ["", Validators.required],
      brandName: ["", Validators.required]
    })
  }
  
  createBrandToDeleteForm(){
    this.brandToDeleteForm = this.formBuilder.group({
      brandId: ["", Validators.required]
    })
  }


  addBrand(){
    if(this.brandForm.valid){
      let brandToAdd = Object.assign({}, this.brandForm.value)
      this.brandService.addBrand(brandToAdd).subscribe(response =>{
        this.toastrService.success(response.message);
        this.getBrands();
      },responseError => {
        this.toastrService.error(responseError.error.message);
      })
    }
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }


  updateBrand(){
    if(this.brandToUpdateForm.valid){
      let brandToUpdate = Object.assign({},this.brandToUpdateForm.value);
      this.brandService.updateBrand(brandToUpdate).subscribe(response=>{
        this.toastrService.success(response.message);
        this.getBrands();
      },ResponseError => {
        this.toastrService.error(ResponseError.error.message);
      })
    }
  }
  deleteBrand(){
    if(this.brandToDeleteForm.valid){
      let brandToDelete = Object.assign({},this.brandToDeleteForm.value)
      this.brandService.deleteBrand(brandToDelete).subscribe(response => {
        this.toastrService.warning(response.message);
      })
    }
  }

}
