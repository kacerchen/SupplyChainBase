import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-search-process-table',
  templateUrl: './search-process-table.component.html',
  styleUrls: ['./search-process-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchProcessTableComponent implements OnInit {

  @Input() searchProcesses: any;
  newData: Object[];
  columnsToDisplay: string[] = ['lotNumber', 'component', 'containerID', 'expectedProduct', 'manufacturer', 'currentState', 'update'];
  dataSource = new MatTableDataSource<Object>();
  expandedElement: Object | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectedLotNum: string;

  constructor() { 
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...

    if(this.searchProcesses != undefined) {
      console.log(this.searchProcesses);
      // this.newData = this.searchProcesses;
      // console.log(this.newData);
      this.dataSource.data = this.searchProcesses;
    }
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setSelected(lotNumber: string) {
    this.selectedLotNum = lotNumber;
  }

}
