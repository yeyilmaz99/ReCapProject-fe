import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorForm:FormGroup
  colorUpdateForm:FormGroup
  colors:Color[];
  colorToDeleteForm:FormGroup;
  constructor(private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.createColorForm();
    this.getColors();
    this.createColorUpdateForm();
    this.createColorToDeleteForm();
  }


  createColorForm(){
    this.colorForm = this.formBuilder.group({
      colorName : ["", Validators.required]
    })
  }
  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId : ["", Validators.required],
      colorName: ["", Validators.required]
    })
  }
  createColorToDeleteForm(){
    this.colorToDeleteForm = this.formBuilder.group({
      colorId: ["",Validators.required]
    })
  }


  addColor(){
    if(this.colorForm.valid){
      let colorToAdd:Color = Object.assign({},this.colorForm.value);
      this.colorService.addColor(colorToAdd).subscribe(response => {
        this.toastrService.success(response.message);
        this.getColors();
      },responseError => {
        this.toastrService.error(responseError.error.message)
      })
    }
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  updateColor(){
    if(this.colorUpdateForm.valid){
      let colorToUpdate = Object.assign({},this.colorUpdateForm.value)
      this.colorService.updateColor(colorToUpdate).subscribe(response => {
        this.toastrService.success(response.message);
        this.getColors();
      },responseError => {
        this.toastrService.error(responseError.message);
      })
    }
  }

  deleteColor(){
    if(this.colorToDeleteForm.valid){
      console.log(this.colorToDeleteForm.value);
    }
  }
  







}
