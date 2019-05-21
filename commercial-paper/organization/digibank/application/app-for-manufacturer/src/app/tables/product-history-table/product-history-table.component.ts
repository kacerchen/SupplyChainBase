import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-product-history-table',
  templateUrl: './product-history-table.component.html',
  styleUrls: ['./product-history-table.component.css']
})
export class ProductHistoryTableComponent implements OnInit {

  @Input() history: any;

  displayedColumns: string[] = ['productID', 'name', 'supplier', 'owner', 'currentState', 'weight', 'type', 'from'];
  dataSource = new MatTableDataSource<Object>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...

    if(this.history != undefined) {
      console.log(this.history);
      // this.newData = this.searchProcesses;
      // console.log(this.newData);
      this.dataSource.data = this.history;
    }
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

}