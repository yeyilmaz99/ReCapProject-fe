import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandForm:FormGroup
  constructor( private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    
  }


  createBrandForm(){
    this.brandForm = this.formBuilder.group({
      brandName : ["", Validators.required]
    })
  }

}
