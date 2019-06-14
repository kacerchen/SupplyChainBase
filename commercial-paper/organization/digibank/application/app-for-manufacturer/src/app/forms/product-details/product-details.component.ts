import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ProcesslineApiService } from '../../processline-api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: any;
  @Input() username: string;

  productId: string;
  processlineId: string;

  all_history_of_process: Object;

  constructor(private processlineApiService: ProcesslineApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.product) {
      console.log(this.product);
      this.productId = this.product.productID;
      this.processlineId = this.extractFirstText(this.product.processline);
      console.log(this.processlineId);
      this.getHistoryByKey();
    }
  }

  extractFirstText(str): string{
    const matches = str.match(/"(.*?)"/);
    return matches
      ? matches[1]
      : str;
  }

  getHistoryByKey(): any {
    let queryHistory = {
      username: this.username,
      lotNumber: this.processlineId,
    }

    //query product with same product name, owner, productID
    this.processlineApiService.getHistoryByKey(queryHistory)
    .subscribe((data: any) => {
      this.all_history_of_process = this.getDataSource(data);
      console.log(this.all_history_of_process);
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
      finalArr.push(j['Record']);      
    }
    return finalArr;
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

}

export interface Result {
  processline: Object; 
}