import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
  }
  

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['', Validators.required]
    })
  }


  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
    }
  }
  





}
