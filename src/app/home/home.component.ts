import { Component, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BudjetService } from '../budjet.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // public lcard1: any;
  // public lcard2: any;
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

    // user: new FormControl('username', Validators.required)
  });

  ngOnInit(): void{
    // this.service.getCardData() 
    }
  add() {
    let amount = Number(this.currencyForm.controls['amt'].value);
    
 

    if (amount > 0) {
      this.service.card1.push(this.currencyForm.value);
      this.cardOne = this.service.card1;
      console.log(this.cardOne);
      // this.lcard1=this.currencyForm.value;
    } else if (amount < 0) {
      this.service.card2.push(this.currencyForm.value);
      this.cardTwo = this.service.card2;
      console.log(this.cardTwo);

      // this.lcard2=this.currencyForm.value;

    } else {
      this.wrongInput = 'Wrong Input';
    }
  //   let peyLoad =
  //   {"card1":this.lcard1,
  //   "card2":this.lcard2,
  //   "user":this.ipt
  // }
  //   this.service.postCardData(peyLoad).subscribe(data=>{
  //     console.log("new data",data);
  //     this.service.getCardData()  
  //   })

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
    this.currencyForm.reset();
  }
  login(){
this.dispaly=!this.dispaly;

if(this.users.indexOf(this.ipt)===-1){
  this.users.push(this.ipt);
  console.log(this.users);
}
console.log(this.users)

  }
  back(){
    this.dispaly=!this.dispaly
  }
  
  }

