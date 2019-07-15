import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-pending-order-list',
  templateUrl: './pending-order-list.component.html',
  styleUrls: ['./pending-order-list.component.css']
})
export class PendingOrderListComponent implements OnInit {

  @Input() all_orders: any;
  @Input() username: string;

  pendingOrders: any;
  pendingReceier: any;
  pendingCreator: any;
  selectedOrder: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.all_orders) {
      this.pendingOrders = this.filterFinal(this.all_orders);
      this.pendingReceier = this.pendingOrders[0];
      this.pendingCreator = this.pendingOrders[1];
    }
  }

  filterFinal(arr: any): any {
    let tempArr = [];
    let tempArr2 = [];
    console.log(arr);

    for(let obj of arr) {
      if(obj['currentState'] == '4'){
        tempArr.push(obj);
      } else if(obj['currentState'] == '5'){
        tempArr2.push(obj);
      }
    }

    console.log(tempArr);
    console.log(tempArr2);

    return [tempArr, tempArr2];
  }

  setSelectedOrder(order: any): void {
    this.selectedOrder = order;
  }

  toFormatDate(time: any): string{
    if(time.length == 10) {
      return formatDate(Number(time *1000), 'medium', 'en-US');
    } else if(time.length == 13) {
      return formatDate(Number(time), 'medium', 'en-US');      
    }
  }

}
