import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OrderApiService } from '../../order-api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-all-shipments-table',
  templateUrl: './all-shipments-table.component.html',
  styleUrls: ['./all-shipments-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllShipmentsTableComponent implements OnInit {

  @Input() allOrders: any;

  dataSource = new MatTableDataSource<Object>();
  columnsToDisplay = ['orderID', 'name', 'price', 'totalAmount', 'currentState', 'type', 'update'];
  expandedElement: Object | null;

  constructor(private orderApiService: OrderApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...

    if(this.allOrders != undefined) {
      console.log(this.allOrders);
      // this.newData = this.searchProcesses;
      // console.log(this.newData);
      this.dataSource.data = this.filterPendingShip(this.allOrders);
    }
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

  filterPendingShip(arr: any): any{
    let result = arr.filter(ele => ele.currentState == '2');
    console.log(result);
    return result;
  }

  changeStatus(id: any): any{

  }

}
