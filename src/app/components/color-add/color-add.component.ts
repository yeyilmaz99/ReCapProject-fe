import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorForm:FormGroup
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {

  }


  createColorForm(){
    
  }






}
