import { Component, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BudjetService } from '../budjet.service';
import { elementAt } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // public lcard1: any;
  // public lcard2: any;
  public arr=[1,2,3,4,5,5,3,2,4,2,1,6]
public tableData: any;
  public displayTable: boolean=false;
public users:any=["james","ram"];
  public ipt: any;
public dispaly: boolean=false;
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
    name: new FormControl('', Validators.required),
  });

  ngOnInit(): void{
    }
  add() {
    let amount = Number(this.currencyForm.controls['amt'].value);
    
 

    if (amount > 0) {
      this.service.card1.push(this.currencyForm.value);
      this.cardOne = this.service.card1;
      console.log(this.cardOne);
    } else if (amount < 0) {
      this.service.card2.push(this.currencyForm.value);
      this.cardTwo = this.service.card2;
      console.log(this.cardTwo);
    } else {
      this.wrongInput = 'Wrong Input';
    }
    this.service.mergeCard();
    this.tableData=this.service.card;
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
 this.tableData=this.service.mergeCard();

    this.service.totalamt();
  }
  edit(index: any, card: any) {
    this.buttn = !this.buttn;
    this.editCard = card;
    this.cardIndex = index;
    if (card == 'card1') {
      this.editCard1 = this.cardOne.find(
        (data: any) => this.cardOne.indexOf(data) == index
      );
      console.log(this.editCard1);
      this.currencyForm.controls['amt'].patchValue(this.editCard1.amt);
      this.currencyForm.controls['dscptn'].patchValue(this.editCard1.dscptn);
      this.currencyForm.controls['name'].patchValue(this.editCard1.name);

    } else if (card == 'card2') {
      this.editCard2 = this.cardTwo.find(
        (data: any) => this.cardTwo.indexOf(data) == index
      );
      console.log(this.editCard2);

      this.currencyForm.controls['amt'].patchValue(this.editCard2.amt);
      this.currencyForm.controls['dscptn'].patchValue(this.editCard2.dscptn);
      this.currencyForm.controls['name'].patchValue(this.editCard2.name);


    }
  }
  save() {
   
    if (this.editCard == 'card1') {
      this.service.card1.forEach((element, index) => {
        if (index == this.cardIndex) {
          element.amt = this.currencyForm.controls['amt'].value;
          element.dscptn = this.currencyForm.controls['dscptn'].value;
          element.name = this.currencyForm.controls['name'].value;


          console.log(element);
        }
      });
    } else if (this.editCard == 'card2') {
      this.service.card2.forEach((element, index) => {
        if (index == this.cardIndex) {
          element.amt = this.currencyForm.controls['amt'].value;
          element.dscptn = this.currencyForm.controls['dscptn'].value;
          element.name = this.currencyForm.controls['name'].value;

          console.log(element);
        }
      });
    }
    this.buttn = !this.buttn;
    this.service.totalamt();
    this.service.mergeCard();
    this.tableData=this.service.card;
  }
  login(){
this.dispaly=!this.dispaly;

if(this.users.indexOf(this.ipt)===-1){
  this.users.push(this.ipt);
  // console.log(this.users);
}
// console.log(this.users)

  }
  back(){
    this.dispaly=!this.dispaly
  }
  table(){
    this.displayTable=!this.displayTable;
    this.service.mergeCard();
    this.tableData=this.service.card;
    this.filterAndCombineObjects();
  }
  public filterAndCombineObjects(): any[] {
    const filteredData: any[] = [];
    const userTotals: any = {};
    let positiveAmtTotal = 0;
    let negativeAmtTotal = 0;


    for (const userName of this.users) {
      const userObjects = this.tableData.filter((obj:any ) => obj.name === userName);

      if (userObjects.length > 0) {
        const userTotal: any = { positive: 0, negative: 0 };
        const combinedObject = userObjects.reduce((acc : any, curr :any) => {
         
          const amount = Number(curr.amt);

          if (amount > 0) {
            positiveAmtTotal += amount;
          } else if (amount < 0) {
            negativeAmtTotal += amount;
          }


          
acc.amt = (acc.amt || 0) + amount;
          return acc;
        }, {});

        combinedObject.name = userName;
        filteredData.push(combinedObject);
        userTotals[userName] = userTotal;
      }
    }
    console.log('Individual User Totals:', userTotals);
    console.log('Positive Amount Total:', positiveAmtTotal);
    console.log('Negative Amount Total:', negativeAmtTotal);
    return filteredData;
  }
}
   
  



