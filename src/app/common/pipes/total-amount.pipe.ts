import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalAmount',
  standalone: true
})
export class TotalAmountPipe implements PipeTransform {
  transform(value: number, quantity: number): number {
    return Number(value) * Number(quantity); 
  }
}
