import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OrderApiService } from '../../order-api.service';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export enum StateOptions {
  ACCEPTED = "2",
  ABANDONED = "3",
}

@Component({
  selector: 'app-all-orders-table',
  templateUrl: './all-orders-table.component.html',
  styleUrls: ['./all-orders-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllOrdersTableComponent implements OnInit {

  @Input() allOrders: any;

  username: string;

  keys = Object.keys;
  stateOptions = StateOptions;
  state: string;

  dataSource = new MatTableDataSource<Object>();
  columnsToDisplay = ['orderID', 'name', 'price', 'totalAmount', 'currentState', 'type'];
  expandedElement: Object | null;

  constructor(private route: ActivatedRoute, private orderApiService: OrderApiService) { }

  ngOnInit() {
    this.route
      .queryParamMap
      .pipe(map(params => params.get('username') || 'None'))
      .subscribe(username => {
        console.log(username);
        this.username = username
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...

    if(this.allOrders != undefined) {
      console.log(this.allOrders);
      // this.newData = this.searchProcesses;
      // console.log(this.newData);
      this.dataSource.data = this.allOrders;
    }
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

  changeStatus(orderId: string, productId: string, orderer: string): any{

    let updateData = {
      username: this.username,
      orderID: orderId,
      productID: productId,
      updatedTime: new Date().getTime().toString(),
      orderer: orderer,
      modifier: this.username,
      newState: this.state
    }

    console.log(typeof(this.state));

    this.orderApiService.updateOrder(updateData)
      .subscribe((data: any) => {
        console.log(data);
      })
  }

}