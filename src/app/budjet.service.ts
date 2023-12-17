import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BudjetService {
  card1: any[] = [];
  card2: any[] = [];
  TotalAmount: number = 0;
  constructor() {}
  totalamt() {
    let total = 0;

    this.card1.map((data) => {
      total += +data.amt;
    });
    this.card2.map((data) => {
      total += +(data.amt);
    });
    this.TotalAmount = total;
  }
}
