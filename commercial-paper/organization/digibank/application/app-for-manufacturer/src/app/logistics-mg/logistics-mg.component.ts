import { Component, OnInit } from '@angular/core';
import { OrderApiService } from '../order-api.service';

@Component({
  selector: 'app-logistics-mg',
  templateUrl: './logistics-mg.component.html',
  styleUrls: ['./logistics-mg.component.css']
})
export class LogisticsMgComponent implements OnInit {

  queryAll: Object = {
    username: 'User1@org1.example.com',
    orderer: 'CVS',
    productID: '4',
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

  orderID: string;
  productID: string;
  orderer: string;

  allOrders: Object;
  query_order: Object;
  all_history_of_order: Object;
  datasource_all: Object;

  constructor(private orderApiService: OrderApiService) { }

  ngOnInit() {
    this.queryAllOrders();
  }

  queryAllOrders(): any {
    //query all orders with same orderer, productID but different orderID
    this.orderApiService.queryAllOrders(this.queryAll)
    .subscribe((data: any) => {
      console.log(data);
      this.allOrders = data;

      this.datasource_all = this.getDataSource(data);
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