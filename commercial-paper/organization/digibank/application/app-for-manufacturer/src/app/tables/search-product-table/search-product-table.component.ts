import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-search-product-table',
  templateUrl: './search-product-table.component.html',
  styleUrls: ['./search-product-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchProductTableComponent implements OnInit {

  @Input() search: any;
  @Input() username: string;

  columnsToDisplay: string[] = ['productID', 'name', 'supplier', 'owner', 'currentState', 'weight', 'type', 'update'];
  dataSource = new MatTableDataSource<Object>();
  expandedElement: Object | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectedId: string;

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
      this.dataSource.data = this.filterUser(this.search);
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

  setSelected(id: string) {
    this.selectedId = id;
  }

  filterUser(datasource: any) {
    let arr = [];

    for(let obj of datasource) {
      if(obj.owner == this.username) {
        arr.push(obj);
      }
    }
    return arr;
  }

}