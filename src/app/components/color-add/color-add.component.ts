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
  constructor(private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
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
      let colorToAdd:Color = Object.assign({},this.colorForm.value);
      this.colorService.addColor(colorToAdd).subscribe(response => {
        this.toastrService.success(response.message);
      })
    }
  }







}
