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
    })
  }

  initProductLedger(): any {
    this.productApiService.initProductLedger(this.username)
    .subscribe((data: any) => {
      console.log(data);
    })
  }

  initOrderLedger(): any {
    this.orderApiService.initOrderLedger(this.username)
    .subscribe((data: any) => {
      console.log(data);
    })
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
