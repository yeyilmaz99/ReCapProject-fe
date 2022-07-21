import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandForm:FormGroup
  constructor( private formBuilder:FormBuilder,
    private brandService:BrandService) { }

  ngOnInit(): void {
    this.createBrandForm();
  }


  createBrandForm(){
    this.brandForm = this.formBuilder.group({
      brandName : ["", Validators.required]
    })
  }


  addBrand(){
    if(this.brandForm.valid){
      let brandToAdd = Object.assign({}, this.brandForm.value)
      this.brandService.addBrand(brandToAdd).subscribe(response =>{
      })
    }
  }

}
