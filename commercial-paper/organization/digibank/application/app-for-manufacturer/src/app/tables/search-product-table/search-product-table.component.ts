import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-search-product-table',
  templateUrl: './search-product-table.component.html',
  styleUrls: ['./search-product-table.component.css']
})
export class SearchProductTableComponent implements OnInit {

  @Input() search: any;

  displayedColumns: string[] = ['productID', 'name', 'supplier', 'owner', 'weight', 'type'];
  dataSource = new MatTableDataSource<Object>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { 
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...

    if(this.search != undefined) {
      console.log(this.search);
      // this.newData = this.searchProcesses;
      // console.log(this.newData);
      this.dataSource.data = this.search;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

}