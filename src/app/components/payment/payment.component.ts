import { Component, OnInit } from '@angular/core';
import {   FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/paymentService/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm:FormGroup
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private paymentService:PaymentService
  ) { }

  ngOnInit(): void {
    this.createPaymentForm();
  }


  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardName: ['',Validators.required],
      cardNumber: ['',Validators.required],
      expirationDate: ['',Validators.required],
      securityCode: ['',Validators.required]
    });
  }

  add(){
    if (this.paymentForm.valid){
      let payment:Payment = Object.assign({},this.paymentForm.value);
      this.paymentService.add(payment).subscribe( (response) => {
        this.toastrService.success(response.message,"Araç Başarıyla Kiralandı");

      },
      (responseError)=> {
        this.toastrService.error(responseError.error.message);
      }
      )
    }
  }




}
