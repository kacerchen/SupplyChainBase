import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderApiService } from '../order-api.service';

@Component({
  selector: 'app-procurement-mg',
  templateUrl: './procurement-mg.component.html',
  styleUrls: ['./procurement-mg.component.css']
})
export class ProcurementMgComponent implements OnInit {

  username: string = 'User1@org1.example.com';

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
    orderer: 'DigiBank',
    productID: '1',
    orderID: '1',
  }

  queryOne: Object = {
    username: 'User1@org1.example.com',
    orderer: 'DigiBank',
    productID: '1',
    orderID: '1',
  }

  queryHistory: Object = {
    username: 'User1@org1.example.com',
    orderer: 'DigiBank',
    productID: '1',
    orderID: '1',
  }

  newOrder: Object;
  modifiedOrder: Object;
  updatedOrder: Object;
  allOrders: Object;
  query_order: Object;
  all_history_of_order: Object;

  constructor(private orderApiService: OrderApiService) { }

  ngOnInit() {
    this.getHistoryByKey();
  }

  initOrderLedger(): any {
    this.orderApiService.initOrderLedger(this.username)
    .subscribe((data: any) => {
      console.log(data);
    })
  }

  initOrder(): any {
    this.orderApiService.initOrder(this.data)
    .subscribe((data: any) => {
      console.log(data);
      this.newOrder = data;
    })
  }

  modifyOrder(): any {
    this.orderApiService.modifyOrder(this.modifiedData)
    .subscribe((data: any) => {
      console.log(data);
      this.modifiedOrder = data;
    })
  }

  updateOrder(): any {
    this.orderApiService.updateOrder(this.updatedData)
    .subscribe((data: any) => {
      console.log(data);
      this.updatedOrder = data;
    })
  }

  queryAllOrders(): any {
    //query all orders with same orderer, productID but different orderID
    this.orderApiService.queryAllOrders(this.queryAll)
    .subscribe((data: any) => {
      console.log(data);
      this.allOrders = data;
    })
  }

  queryOrder(): any {
    //query a specific order by orderer, productID, orderID
    this.orderApiService.queryOrder(this.queryOne)
    .subscribe((data: any) => {
      console.log(data);
      this.query_order = data;
    })
  }

  getHistoryByKey(): any {
    //query order with same orderer, productID, orderID
    this.orderApiService.getHistoryByKey(this.queryHistory)
    .subscribe((data: any) => {
      console.log(data);
      this.all_history_of_order = data;
    })
  }

}
