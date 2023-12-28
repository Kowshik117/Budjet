import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BudjetService {
  public card1: any[] = [];
  public card2: any[] = [];
   public card :any[] =[];


   
  TotalAmount: number = 0;
  constructor( private http: HttpClient) {}
 
  totalamt() {
    let total = 0;

    this.card1.map((data) => {
      total += +(data.amt);
    });
    this.card2.map((data) => {
      total += +(data.amt);
    });
    this.TotalAmount = total;
  }
  mergeCard(){
    this.card=this.card1.concat(this.card2);
    console.log(this.card);
  }
}
