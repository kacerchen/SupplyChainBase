import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ProcesslineApiService } from '../processline-api.service';
import { ProductApiService } from '../product-api.service';
import { OrderApiService } from '../order-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: any;

  constructor(private route: ActivatedRoute, private router: Router, 
              private processlineApiService: ProcesslineApiService,
              private productApiService: ProductApiService,
              private orderApiService: OrderApiService) { }

  ngOnInit() {
    this.route
      .queryParamMap
      .pipe(map(params => params.get('username') || 'None'))
      .subscribe(username => {
        console.log(username);
        this.username = username
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

}
