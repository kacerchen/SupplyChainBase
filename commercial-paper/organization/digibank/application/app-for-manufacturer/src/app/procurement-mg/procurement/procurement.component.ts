import { Component, OnInit } from '@angular/core';
import { OrderApiService } from '../../order-api.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.css']
})
export class ProcurementComponent implements OnInit {

  username: string;

  all_orders: Object;
  all_history_of_order: Object;
  datasource_all: any;
  datasource_history: any;
  datasource_pend: any;

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
      this.all_orders = data;

      this.datasource_all = this.getDataSource(data);
      this.datasource_pend = this.getDataSource(data);
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