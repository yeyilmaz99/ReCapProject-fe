import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/register';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

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
    private router:Router,
    private localStorageService:LocalStorageService
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
        this.router.navigate(['home']);
        this.toastrService.success(response.message);
        this.localStorageService.setItem('token', response.data.token)
      },responseError=>{
        this.toastrService.error(responseError.error);
      })
    }else{
      this.toastrService.error('Lütfen Boş Alanları Doldurunuz')
    }
  }
  





}
