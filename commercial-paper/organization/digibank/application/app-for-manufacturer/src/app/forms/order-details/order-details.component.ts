import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  @Input() order: any;
  @Input() username: string;

  orderId: string;
  client: string;
  type: string;
  time: string;
  productObj: Object;
  assuranceObj:  Object;
  paymentObj: Object;
  shippingObj: Object;

  panelOpenState = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.order) {
      console.log(this.order);
      this.orderId = this.order.orderID;
      this.client = this.order.receiver;
      this.time = this.toFormatDate(this.order.createdTime);
      this.productObj = this.order.productObj;
      this.assuranceObj = this.order.assuranceObj;
      this.paymentObj = this.order.paymentObj;
      this.shippingObj = this.order.shippingObj;

      this.getStringType(this.order.type);

      console.log(this.productObj);
    }
  }

  getStringType(num: string): void {
    switch(num) {
      case '1':
        this.type = 'Standard contract';
        break;
      case '2':
        this.type = 'Customized contract';
        break;
    }
  }

  extractFirstText(str): string{
    const matches = str.match(/"(.*?)"/);
    return matches
      ? matches[1]
      : str;
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

}
