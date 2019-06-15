import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderApiService } from '../../order-api.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

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
  selector: 'app-modify-order',
  templateUrl: './modify-order.component.html',
  styleUrls: ['./modify-order.component.css']
})
export class ModifyOrderComponent implements OnInit {

  keys = Object.keys;
  typeOptions = TypeOptions;
  username: string;
  orderID: string;
  type: string;
  productID: string;
  newProductID: string[] = ['1', '2', '3', '4', '5'];
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

  updatedTime: string;
  orderer: string;
  modifier: string;
  receiver: string;
  newState: string;

  updatedOrder: Object;
  query_order: any;

  constructor(private route: ActivatedRoute, private router: Router,  private orderApiService: OrderApiService) { }

  ngOnInit() {
    this.route
      .queryParamMap
      .subscribe(queryParams => {
        this.username = queryParams.get("username");
        this.orderID = queryParams.get("orderID");
        this.modifier = this.username;
        this.queryOrder(this.orderID);
      })
  }

  queryOrder(id :string): any {
    let queryOne = {
      username: this.username,
      orderID: id,
    }

    //query a specific order by orderer, productID, orderID
    this.orderApiService.queryOrder(queryOne)
    .subscribe((data: any) => {
      console.log(data);
      this.query_order = data;

      this.type = data.orders.type;
      this.productID = data.orders.productObj.productID;
      this.name = data.orders.productObj.name;
      this.weight = data.orders.productObj.weight;
      this.price = data.orders.productObj.price;

      this.specs = data.orders.assuranceObj.specs;
      this.qualifiedOperator = data.orders.assuranceObj.qualifiedOperator;
      this.methods = data.orders.assuranceObj.methods;
      // this.leadTime = data.orders.assuranceObj.leadTime;

      this.address = data.orders.shippingObj.address;
      // this.dispatchDate = data.orders.shippingObj.dispatchDate;
      this.shipMethod = data.orders.shippingObj.shipMethod;
      this.tradeTerm = data.orders.shippingObj.tradeTerm;

      this.initPayment = data.orders.paymentObj.initPayment;
      this.payMethod = data.orders.paymentObj.payMethod;
      this.totalAmount = data.orders.paymentObj.totalAmount;

      this.receiver = data.orders.receiver;
    })
  }

  modifyOrder(): any {
    this.updatedTime = new Date().getTime().toString();
    this.address = this.street + ', ' + this.city + ', ' + this.state + ', ' + this.country + ' ' + this.zipcode;
    if(this.username == this.orderer) {
      this.newState = '5';
    } else if(this.username == this.receiver) {
      this.newState = '4';
    }

    let data = {
      username: this.username,
      orderID: this.orderID,
      type: this.type,
      productID: this.productID,
      newProductID: this.productID,
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
      updatedTime: this.updatedTime,
      orderer: this.username,
      modifier: this.username,
      newState: this.newState
    }

    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'username': this.username },
    };

    this.orderApiService.modifyOrder(data)
    .subscribe((data: any) => {
      console.log(data);
      this.updatedOrder = data;
      this.router.navigate(['/procurement/modify_order/' + data.order.orderID], navigationExtras);
    })
  }

}
