import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ProductApiService } from '../../product-api.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  username: string;

  all_products: Object;
  all_history_of_product: Object;
  datasource_all: any;
  datasource_search: any;
  datasource_history: any;

  constructor(private route: ActivatedRoute, private productApiService: ProductApiService) { }

  ngOnInit() {
    this.route
      .queryParamMap
      .pipe(map(params => params.get('username') || 'None'))
      .subscribe(username => {
        console.log(username);
        this.username = username
      })

    this.queryAllProducts();
  }

  queryAllProducts(): any {
    let queryAll = {
      username: this.username,
      productID: '1',
    }

    //query all products with same product name, owner but different productID
    this.productApiService.queryAllProducts(queryAll)
    .subscribe((data: any) => {
      console.log(data);
      this.all_products = data;

      this.datasource_all = this.getDataSource(data);
      this.datasource_search = this.getDataSource(data);
    })
  }

  getHistoryByKey(): any {
    let queryHistory = {
      username: this.username,
      productID: '1',
    }

    //query product with same product name, owner, productID
    this.productApiService.getHistoryByKey(queryHistory)
    .subscribe((data: any) => {
      console.log(data);
      this.datasource_history = this.getDataSource(data);      
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
      finalArr.push(j['Record']);      
    }
    return finalArr;
  }

}

export interface Result {
  products: Object; 
}