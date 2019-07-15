import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ProcesslineApiService } from '../processline-api.service';
import { ProductApiService } from '../product-api.service';
import { OrderApiService } from '../order-api.service';
import { UsersApiService } from '../users-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: any;
  user: Object;
  mspid: string;
  role: string;
  processView: boolean;
  productView: boolean;
  logisticsView: boolean;
  procurementView: boolean;

  all_processes: [];
  all_products: [];
  all_orders: [];
  total_processes: string;
  total_products: string;
  total_orders: string;

  constructor(private route: ActivatedRoute, private router: Router, 
              private processlineApiService: ProcesslineApiService,
              private productApiService: ProductApiService,
              private orderApiService: OrderApiService,
              private usersApiService: UsersApiService) { }

  ngOnInit() {
    this.route
      .queryParamMap
      .pipe(map(params => params.get('username') || 'None'))
      .subscribe(username => {
        console.log(username);
        this.username = username;
        this.getUser(username);
      })

    this.initProcessLineLedger();
    this.initProductLedger();
    this.initOrderLedger();
  }

  initProcessLineLedger(): any {
    this.processlineApiService.initProcessLineLedger(this.username)
    .subscribe((data: any) => {
      console.log(data);

      this.queryAllProcesses();
    })
  }

  initProductLedger(): any {
    this.productApiService.initProductLedger(this.username)
    .subscribe((data: any) => {
      console.log(data);

      this.queryAllProducts();
    })
  }

  initOrderLedger(): any {
    this.orderApiService.initOrderLedger(this.username)
    .subscribe((data: any) => {
      console.log(data);

      this.queryAllOrders();
    })
  }

  queryAllProcesses(): any {
    let queryAll = {
      username: this.username,
      lotNumber: '00001',
    }
    //query all processes with same expected product, manufacturer but different lotNumber
    this.processlineApiService.queryAllProcesses(queryAll)
    .subscribe((data: any) => {
      console.log(data);
      this.all_processes = this.getDataSource(data.processline, 'process');
      console.log(this.all_processes);
      this.total_processes = this.all_processes.length.toString();
    })
  }

  queryAllProducts(): any {
    let queryAll = {
      username: this.username,
      productID: '1',
    }

    //query all products with same product name, owner but different productID
    this.productApiService.queryAllProducts(queryAll)
    .subscribe((data: any) => {
      console.log(data);
      this.all_products = this.getDataSource(data.products, 'product');
      this.total_products = this.all_products.length.toString();
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
      this.all_orders = this.getDataSource(data.orders, 'order');
      this.total_orders = this.all_orders.length.toString();
    })
  }

  getDataSource(obj: any, type: string): any {
    let records = obj;
    let tempArr = [];
    let finalArr = [];

    for(let i of Object.keys(records)){
      if(i != 'class' && i != 'currentState' && i != 'key') {
        tempArr.push(records[i]);
      }
    }

    for(let j of tempArr){
      // console.log(j['Record']);
      if(type == 'product' && j['Record']['owner'] == this.username) {
        finalArr.push(j['Record']);      
      } else if(type == 'process') {
        finalArr.push(j['Record']); 
      } else if(type == 'order' && j['Record']['orderer'] == this.username) {
        finalArr.push(j['Record']); 
      } else if(type == 'order' && j['Record']['receiver'] == this.username) {
        finalArr.push(j['Record']); 
      }
    }
    return finalArr;
    // console.log(_to);
  }

  getUser(username: string): any{
    this.usersApiService.getUser(username)
    .subscribe((data: any) => {
      // console.log(data);
      console.log(data.user);
      this.user = data.user;
      this.role = data.user.role;
      this.mspid = data.user.mspid;

      this.setViewPermission();
    })
  }

  setViewPermission(): void{

    switch(this.role) {
      case "Manufacturer": {
        this.processView = true;
        this.productView = true;
        this.procurementView = true;
        this.logisticsView = true;

        break;
      }

      case "Supplier": {
        this.processView = true;
        this.productView = true;
        this.procurementView = true;
        this.logisticsView = true;

        break;
      }

      case "Retailer": {
        this.productView = true;
        this.logisticsView = true;
        this.procurementView = true;

        break;
      }

      case "Distributor": {
        this.logisticsView = true;

        break;
      }

      case "Auditor": {
        this.processView = true;

        break;
      }
    }
  }

}

export interface Result {
  processline: Object; 
}