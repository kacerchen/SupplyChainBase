import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

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
  type: number;
  availProductId: string[];
  selectItem: string;
  spec: string;
  qualifiedOperator: string;
  methods: string;

  date = new FormControl(new Date());
  leadTime = new FormControl((new Date()).toISOString());
  dispatchTime = new FormControl((new Date()).toISOString());

  values = Object.values;
  shipOptions = ShipOptions;
  shipMethod: string;

  tradeOptions = TradeOptions;
  tradeTerm: string;

  payOptions = PayOptions;
  payMethod: string;

  orderer: string;
  receiver: string;

  constructor() { }

  ngOnInit() {
  }

}
