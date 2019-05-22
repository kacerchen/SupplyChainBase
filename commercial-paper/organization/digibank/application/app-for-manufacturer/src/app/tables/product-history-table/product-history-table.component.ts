import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ProductApiService } from '../../product-api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-product-history-table',
  templateUrl: './product-history-table.component.html',
  styleUrls: ['./product-history-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductHistoryTableComponent implements OnInit {

  @Input() history: any;
  productID: string;
  username: string;

  columnsToDisplay: string[] = ['productID', 'name', 'supplier', 'owner', 'currentState', 'weight', 'type', 'from'];
  dataSource = new MatTableDataSource<Object>();
  expandedElement: Object | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private productApiService: ProductApiService) { }

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

  search(): any{
    this.getHistoryByKey(this.productID);
    return "Search done.";
  }

  getHistoryByKey(id: string): any {
    let queryHistory = {
      username: this.username,
      productID: id,
    }

    console.log(id);
    console.log(this.username);

    //query product with same product name, owner, productID
    this.productApiService.getHistoryByKey(queryHistory)
    .subscribe((data: any) => {
      console.log(data);
      this.history = this.getDataSource(data);
      this.dataSource.data = this.history;
    })
  }

  getDataSource(obj: Result): any {
    let records = obj.products;
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
  products: Object; 
}