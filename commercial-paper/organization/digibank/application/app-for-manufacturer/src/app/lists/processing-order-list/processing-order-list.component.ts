import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-processing-order-list',
  templateUrl: './processing-order-list.component.html',
  styleUrls: ['./processing-order-list.component.css']
})
export class ProcessingOrderListComponent implements OnInit {

  @Input() all_orders: any;
  @Input() username: string;

  orders: any;
  processingOrders: any;
  finishedOrder: any;
  abandonedOrder: any;
  selectedOrder: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.all_orders) {
      this.orders = this.filterFinal(this.all_orders);
      this.processingOrders = this.orders[0];
      this.finishedOrder = this.orders[1];
      this.abandonedOrder = this.orders[2];
    }
  }

  filterFinal(arr: any): any {
    let tempArr = [];
    let tempArr2 = [];
    let tempArr3 = [];

    for(let obj of arr) {
      if(obj['currentState'] == '6'){
        tempArr.push(obj);
      } else if(obj['currentState'] == '7'){
        tempArr2.push(obj);
      } else if(obj['currentState'] == '3'){
        tempArr3.push(obj);
      }
    }

    return [tempArr, tempArr2, tempArr3];
  }

  setSelectedOrder(order: any): void {
    this.selectedOrder = order;
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

}
