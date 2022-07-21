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
  constructor( private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService 
    ) { }

  ngOnInit(): void {
    this.createBrandForm();
    this.getBrands();
  }


  createBrandForm(){
    this.brandForm = this.formBuilder.group({
      brandName : ["", Validators.required]
    })
  }
  createBrandToUpdateForm(){
    this.brandToUpdateForm = this.formBuilder.group({

    })
  }


  addBrand(){
    if(this.brandForm.valid){
      let brandToAdd = Object.assign({}, this.brandForm.value)
      this.brandService.addBrand(brandToAdd).subscribe(response =>{
        this.toastrService.success(response.message);
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


  selectBrand(){
    if(this.brandToUpdateForm.valid){
      console.log(this.brandToUpdateForm.value);
    }
  }

}
