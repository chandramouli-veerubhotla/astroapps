import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-calc',
  templateUrl: './return-calc.component.html',
  styleUrls: ['./return-calc.component.scss']
})
export class ReturnCalcComponent implements OnInit {

  yearEndDate: Date = new Date();
  depositDate: Date = new Date();
  difference: number = 0;

  interestAmount: number = 0;
  totalAmount: number = 0;

  constructor() { 
  }

  ngOnInit(): void {
    let today = new Date();
    let whichYear: number = today.getFullYear()

    if (today.getMonth() > 3) {
      whichYear += 1
    }

    this.yearEndDate = new Date(whichYear, 3, 1)
  }

  changeDate(date: Date) {
    this.depositDate = date;
    let diff = this.yearEndDate.valueOf()-this.depositDate.valueOf();    
    this.difference = Math.ceil(diff / (1000 * 60 * 60 * 24)); 
  }

  calcReturns(amount: string, percentage: string) {
    debugger
    let dailyPercentage = parseFloat(percentage) / (100 * 365)
    this.interestAmount = Math.floor(parseFloat(amount) * this.difference * dailyPercentage)
    this.totalAmount = this.interestAmount + parseFloat(amount)

  }

}
