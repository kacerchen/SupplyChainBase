import { Component, OnInit } from '@angular/core';
import { OrderApiService } from '../order-api.service';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logistics-mg',
  templateUrl: './logistics-mg.component.html',
  styleUrls: ['./logistics-mg.component.css']
})
export class LogisticsMgComponent implements OnInit {

  username: string;

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

  orderID: string;
  productID: string;
  orderer: string;

  allOrders: Object;
  query_order: Object;
  all_history_of_order: Object;
  datasource_all: Object;

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