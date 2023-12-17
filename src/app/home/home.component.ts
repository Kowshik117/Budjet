import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BudjetService } from '../budjet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public cardOne: any;
  public cardTwo: any;
  public Total: any;
  public editCard1: any;
  public editCard2: any;
  public editCard: any;
  public cardIndex: any;

  public buttn: boolean = true;

  public wrongInput: any;

  constructor(private fb: FormBuilder, public service: BudjetService) {}
  public currencyForm = this.fb.group({
    amt: new FormControl('', [Validators.required]),
    dscptn: new FormControl('', Validators.required),
  });

  add() {
    let amount = Number(this.currencyForm.controls['amt'].value);

    if (amount > 0) {
      this.service.card1.push(this.currencyForm.value);
      this.cardOne = this.service.card1;
    } else if (amount < 0) {
      this.service.card2.push(this.currencyForm.value);
      this.cardTwo = this.service.card2;
    } else {
      this.wrongInput = 'Wrong Input';
    }

    this.currencyForm.reset();
    this.service.totalamt();
  }
  delete(index: any, card: any) {
    if (card == 'card1') {
      this.cardOne.splice(index, 1);
      this.service.card1 = this.cardOne;
    } else if (card == 'card2') {
      this.cardTwo.splice(index, 1);
      this.service.card2 = this.cardTwo;
    }
    this.service.totalamt();
  }
  edit(index: any, card: any) {
    this.buttn = !this.buttn;
    this.editCard = card;
    this.cardIndex = index;
    if (card == 'card1') {
      this.editCard1 = this.service.card1.find(
        (data) => this.service.card1.indexOf(data) == index
      );
      console.log(this.editCard1);
      this.currencyForm.controls['amt'].patchValue(this.editCard1.amt);
      this.currencyForm.controls['dscptn'].patchValue(this.editCard1.dscptn);
    } else if (card == 'card2') {
      this.editCard2 = this.service.card2.find(
        (data) => this.service.card2.indexOf(data) == index
      );
      console.log(this.editCard2);

      this.currencyForm.controls['amt'].patchValue(this.editCard2.amt);
      this.currencyForm.controls['dscptn'].patchValue(this.editCard2.dscptn);
    }
  }
  save() {
    let currentEliment: any;
    if (this.editCard == 'card1') {
      this.service.card1.forEach((element, index) => {
        if (index == this.cardIndex) {
          element.amt = this.currencyForm.controls['amt'].value;
          element.dscptn = this.currencyForm.controls['dscptn'].value;

          console.log(element);
        }
      });
    } else if (this.editCard == 'card2') {
      this.service.card2.forEach((element, index) => {
        if (index == this.cardIndex) {
          element.amt = this.currencyForm.controls['amt'].value;
          element.dscptn = this.currencyForm.controls['dscptn'].value;
          console.log(element);
        }
      });
    }
    this.buttn = !this.buttn;
    this.service.totalamt();
  }
}
