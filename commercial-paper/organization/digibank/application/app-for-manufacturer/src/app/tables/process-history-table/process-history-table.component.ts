import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProcesslineApiService } from '../../processline-api.service';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-process-history-table',
  templateUrl: './process-history-table.component.html',
  styleUrls: ['./process-history-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProcessHistoryTableComponent implements OnInit {

  @Input() historyProcesses: any;
  lotNumber: string;
  username: string;

  columnsToDisplay: string[] = ['lotNumber', 'component', 'containerID', 'expectedProduct', 'manufacturer', 'currentState'];
  dataSource  = new MatTableDataSource<Object>();
  expandedElement: Object | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private processlineApiService: ProcesslineApiService) { }

  ngOnInit() {
    this.route
      .queryParamMap
      .pipe(map(params => params.get('username') || 'None'))
      .subscribe(username => {
        console.log(username);
        this.username = username
      })

    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...

    if(this.historyProcesses != undefined) {
      console.log(this.historyProcesses);
      // this.newData = this.searchProcesses;
      // console.log(this.newData);
      this.dataSource.data = this.historyProcesses;
    }
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

  search(): any{
    this.getHistoryByKey(this.lotNumber);
    return "Search done.";
  }

  getHistoryByKey(id: string): any {
    let queryHistory = {
      username: this.username,
      lotNumber: id,
    }

    console.log(id);
    console.log(this.username);

    //query product with same product name, owner, productID
    this.processlineApiService.getHistoryByKey(queryHistory)
    .subscribe((data: any) => {
      console.log(data);
      this.historyProcesses = this.getDataSource(data);
      this.dataSource.data = this.historyProcesses;
    })
  }

  getDataSource(obj: Result): any {
    let records = obj.processline;
    let tempArr = [];
    let finalArr = [];

    for(let i of Object.keys(records)){
      if(i != 'class' && i != 'currentState' && i != 'key') {
        tempArr.push(records[i]);
      }
    }

    for(let j of tempArr){
      // console.log(j['Record']);
      finalArr.push(j['Record']);      
    }
    return finalArr;
    // console.log(_to);
  }

}

export interface Result {
  processline: Object; 
}