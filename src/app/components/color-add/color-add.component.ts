import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorForm:FormGroup
  constructor(private colorService:ColorService,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.createColorForm();
  }


  createColorForm(){
    this.colorForm = this.formBuilder.group({
      colorName : ["", Validators.required]
    })
  }


  addColor(){
    if(this.colorForm.valid){
      console.log(this.colorForm.value);
    }
  }







}
