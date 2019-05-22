import { Component, OnInit } from '@angular/core';
import { OrderApiService } from '../order-api.service';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-procurement-mg',
  templateUrl: './procurement-mg.component.html',
  styleUrls: ['./procurement-mg.component.css']
})
export class ProcurementMgComponent implements OnInit {

  username: string;

  data: Object = {
    username: 'User1@org1.example.com',
    orderID: '1',
    type: '1',
    productID: '1',
    name: 'drugA',
    weight: '450',
    price: '1350',
    specs: 'N/A',
    qualifiedOperator: 'N/A',
    methods: 'N/A',
    leadTime: 'N/A',
    address: 'Beacon st., Boston, MA',
    shipMethod: 'air express',
    tradeTerm: 'FCA',
    dispatchDate: 'ship in 2 days',
    totalAmount: '1350',
    initPayment: '500',
    payMethod: 'visa',
    createdTime: '1552521600',
    orderer: 'DigiBank',
    receiver: 'supplierA'
  }

  modifiedData: Object = {
    username: 'User1@org1.example.com',
    orderID: '1',
    productID: '1',
    newProductID: '2',
    name: 'drugA-2',
    weight: '455',
    price: '1356',
    specs: 'N/A',
    qualifiedOperator: 'N/A',
    methods: 'N/A',
    leadTime: 'N/A',
    address: 'Apt 810, Beacon st., Boston, MA',
    shipMethod: 'sea express',
    tradeTerm: 'FAS',
    dispatchDate: 'ship in 5 days',
    totalAmount: '1356',
    initPayment: '500',
    payMethod: 'mastercard',
    updatedTime: '1552821600',
    orderer: 'DigiBank',
    modifier: 'supplierA',
    newState: '5'
  }

  updatedData: Object = {
    username: 'User1@org1.example.com',
    orderID: '1',
    productID: '1',
    updatedTime: '1552821600',
    orderer: 'DigiBank',
    modifier: 'supplierA',
    newState: '6'
  }

  queryAll: Object = {
    username: 'User1@org1.example.com',
    orderID: '1',
  }

  queryOne: Object = {
    username: 'User1@org1.example.com',
    orderID: '1',
  }

  queryHistory: Object = {
    username: 'User1@org1.example.com',
    orderID: '1',
  }

  newOrder: Object;
  modifiedOrder: Object;
  updatedOrder: Object;
  allOrders: Object;
  query_order: Object;
  all_history_of_order: Object;
  datasource_all: Object;
  datasource_pend: Object;

  constructor(private route: ActivatedRoute, private orderApiService: OrderApiService) { }

  ngOnInit() {
    this.route
      .queryParamMap
      .pipe(map(params => params.get('username') || 'None'))
      .subscribe(username => {
        console.log(username);
        this.username = username
      })

    this.queryAllOrders();
  }

  initOrderLedger(): any {
    this.orderApiService.initOrderLedger(this.username)
    .subscribe((data: any) => {
      console.log(data);
    })
  }

  initOrder(): any {
    let data = {
      username: this.username,
      orderID: '4',
      type: '1',
      productID: '7',
      name: 'drugA',
      weight: '450',
      price: '1350',
      specs: 'N/A',
      qualifiedOperator: 'N/A',
      methods: 'N/A',
      leadTime: 'N/A',
      address: 'Beacon st., Boston, MA',
      shipMethod: 'air express',
      tradeTerm: 'FCA',
      dispatchDate: 'ship in 6 days',
      totalAmount: '1350',
      initPayment: '500',
      payMethod: 'visa',
      createdTime: '1552521600',
      orderer: 'DigiBank',
      receiver: 'supplierA'
    }

    this.orderApiService.initOrder(data)
    .subscribe((data: any) => {
      console.log(data);
      this.newOrder = data;
    })
  }

  modifyOrder(): any {
    let modifiedData = {
      username: this.username,
      orderID: '1',
      productID: '7',
      newProductID: '6',
      name: 'drugA-2',
      weight: '455',
      price: '1356',
      specs: 'N/A',
      qualifiedOperator: 'N/A',
      methods: 'N/A',
      leadTime: 'N/A',
      address: 'Apt 810, Beacon st., Boston, MA',
      shipMethod: 'sea express',
      tradeTerm: 'FAS',
      dispatchDate: 'ship in 5 days',
      totalAmount: '1356',
      initPayment: '500',
      payMethod: 'mastercard',
      updatedTime: '1552821600',
      orderer: 'DigiBank',
      modifier: 'supplierA',
      newState: '5'
    }

    this.orderApiService.modifyOrder(modifiedData)
    .subscribe((data: any) => {
      console.log(data);
      this.modifiedOrder = data;
    })
  }

  updateOrder(): any {
    let updatedData = {
      username: this.username,
      orderID: '1',
      productID: '6',
      updatedTime: '1552821600',
      orderer: 'DigiBank',
      modifier: 'supplierA',
      newState: '6'
    }

    this.orderApiService.updateOrder(updatedData)
    .subscribe((data: any) => {
      console.log(data);
      this.updatedOrder = data;
    })
  }

  queryAllOrders(): any {
    let queryAll = {
      username: this.username,
      orderID: '1',
    }

    //query all orders with same orderer, productID but different orderID
    this.orderApiService.queryAllOrders(queryAll)
    .subscribe((data: any) => {
      console.log(data);
      this.allOrders = data;

      this.datasource_all = this.getDataSource(data);
      this.datasource_pend = this.getDataSource(data);
    })
  }

  queryOrder(): any {
    let queryOne = {
      username: this.username,
      orderID: '1',
    }

    //query a specific order by orderer, productID, orderID
    this.orderApiService.queryOrder(queryOne)
    .subscribe((data: any) => {
      console.log(data);
      this.query_order = data;
    })
  }

  getHistoryByKey(): any {
    let queryHistory = {
      username: this.username,
      orderID: '1',
    }

    //query order with same orderer, productID, orderID
    this.orderApiService.getHistoryByKey(queryHistory)
    .subscribe((data: any) => {
      console.log(data);
      this.all_history_of_order = data;
    })
  }

  getDataSource(obj: Result): any {
    let records = obj.orders;
    let tempArr = [];
    let finalArr = [];

    for(let i of Object.keys(records)){
      if(i != 'class' && i != 'currentState' && i != 'key') {
        tempArr.push(records[i]);
      }
    }

    for(let j of tempArr){
      // console.log(j['Record']);
      finalArr.push(j['Record']);      
    }
    return finalArr;
    // console.log(_to);
  }

}

export interface Result {
  orders: Object; 
}