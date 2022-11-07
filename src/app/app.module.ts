import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { JwtModule } from '@auth0/angular-jwt';



import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { SubscribeFormComponent } from './components/subscribe-form/subscribe-form.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponentsModule } from './components/admin/components/admin-components.module';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponentsModule } from './components/user-profile/components/user-components.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { BrandsComponent } from './components/brand/brands/brands.component';
import { OrderByPipe } from './pipes/order-by.pipe';

export function tokenGetter() {
  return localStorage.getItem("token");
}


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    NaviComponent,
    CarComponent,
    RentalComponent,
    CustomerComponent,
    HomeComponent,
    SubscribeFormComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    AdminComponent,
    FavoritesComponent,
    BrandsComponent,
    OrderByPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatPaginatorModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    AdminComponentsModule,
    UserComponentsModule,
    MatFormFieldModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
