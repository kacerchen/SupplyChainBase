import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { OrderApiService } from '../../order-api.service';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

export enum TypeOptions {
  STANDARD = "1",
  CUSTOMIZED = "2",
}

export enum ShipOptions {
  AIR_FREIGHT = "Air Freight",
  OCEAN_FREIGHT = "Ocean Freight",
}

export enum TradeOptions {
  EXW = "EXW",
  FCA = "FCA",
  FAS = "FAS",
  FOB = "FOB",
  CFR = "CFR",
  CIF = "CIF",
  CPT = "CPT",
  CIP = "CIP",
  DAT = "DAT",
  DAP = "DAP",
  DDP = "DDP"
}

export enum PayOptions {
  ONLINEBANK = "Online Bank Payment",
  VISA = "Visa",
  MASTERCARD = "Mastercard",
  TT = "T/T"
}

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  keys = Object.keys;
  typeOptions = TypeOptions;
  username: string;
  orderID: string;
  type: string;
  productID: string;
  availProductId: string[] = ['1', '2', '3', '4', '5'];
  name: string;
  weight: string;
  price: string;
  specs: string;
  qualifiedOperator: string;
  methods: string;

  date = new FormControl(new Date());
  leadTime = new FormControl((new Date()).toISOString());
  dispatchDate = new FormControl((new Date()).toISOString());

  values = Object.values;
  shipOptions = ShipOptions;
  shipMethod: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  address: string;

  tradeOptions = TradeOptions;
  tradeTerm: string;

  payOptions = PayOptions;
  payMethod: string;
  totalAmount: string;
  initPayment: string;

  createdTime: string;
  orderer: string;
  receiver: string;

  newOrder: Object;

  constructor(private route: ActivatedRoute, private orderApiService: OrderApiService) { }

  ngOnInit() {
    this.route
      .queryParamMap
      .pipe(map(params => params.get('username') || 'None'))
      .subscribe(username => {
        console.log(username);
        this.username = username
      })
  }

  initOrder(): any {
    this.createdTime = new Date().getTime().toString();
    this.address = this.street + ', ' + this.city + ', ' + this.state + ', ' + this.country + ' ' + this.zipcode;

    let data = {
      username: this.username,
      orderID: this.orderID.toString(),
      type: this.type,
      productID: this.productID,
      name: this.name,
      weight: this.weight.toString(),
      price: this.price.toString(),
      specs: this.specs,
      qualifiedOperator: this.qualifiedOperator,
      methods: this.methods,
      leadTime: this.leadTime.value,
      address: this.address,
      shipMethod: this.shipMethod,
      tradeTerm: this.tradeTerm,
      dispatchDate: this.dispatchDate.value,
      totalAmount: this.totalAmount.toString(),
      initPayment: this.initPayment.toString(),
      payMethod: this.payMethod,
      createdTime: this.createdTime,
      orderer: this.username,
      receiver: this.receiver
    }

    this.orderApiService.initOrder(data)
    .subscribe((data: any) => {
      console.log(data);
      this.newOrder = data;
    })
  }

}
