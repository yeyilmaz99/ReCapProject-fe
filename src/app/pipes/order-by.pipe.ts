import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';
import { orderBy } from 'lodash';
@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: Car[], sortBy:any, order?:any): any{
    const sortOrder = order ? order : ''; // setting default ascending order
    return orderBy(value,[sortBy],[sortOrder]);
  }

}