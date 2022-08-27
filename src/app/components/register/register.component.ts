import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/register';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private authService: AuthService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
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
      let registerModel: RegisterModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response => {
        
        this.toastrService.success(response.message);
        localStorage.setItem('token', response.data.token)
      },responseError=>{
        this.toastrService.error(responseError.error);
      })
    }else{
      this.toastrService.error('Lütfen Boş Alanları Doldurunuz')
    }
  }
  





}
