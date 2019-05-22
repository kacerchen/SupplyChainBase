import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../product-api.service';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-mg',
  templateUrl: './product-mg.component.html',
  styleUrls: ['./product-mg.component.css']
})
export class ProductMgComponent implements OnInit {

  username: string;

  data: Object = {
    username: 'User1@org1.example.com',
    productID: '1',
    name: 'componentA',
    type: '2',
    from: 'supplierA',
    processline: 'N/A',
    createdTime: '1552521600',
    weight: '450',
    supplier: 'supplierA',
    owner: 'MagnetoCorp'
  }

  updateData: Object = {
    username: 'User1@org1.example.com',
    productID: '1',
    name: 'componentA',
    newState: '3',
    updatedTime: '1552721600',
    owner: 'MagnetoCorp',
    hasNewOwner: 'false',
    newOwner: 'N/A',
  }

  queryAll: Object = {
    username: 'User1@org1.example.com',
    productID: '4',
  }

  queryOne: Object = {
    username: 'User1@org1.example.com',
    productID: '1',
  }

  queryHistory: Object = {
    username: 'User1@org1.example.com',
    productID: '4',
  }

  newProduct: Object;
  updatedProduct: Object;
  allProducts: Object;
  query_product: Object;
  all_history_of_product: Object;
  datasource_all_products: Object;
  datasource_search: Object;
  datasource_history: Object;

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

  initProductLedger(): any {
    this.productApiService.initProductLedger(this.username)
    .subscribe((data: any) => {
      console.log(data);
    })
  }

  addNewProduct(): any {
    let data = {
      username: this.username,
      productID: '9',
      name: 'componentA',
      type: '2',
      from: 'supplierA',
      processline: 'N/A',
      createdTime: '1552521600',
      weight: '450',
      supplier: 'supplierA',
      owner: 'MagnetoCorp'
    }

    this.productApiService.initProduct(data)
    .subscribe((data: any) => {
      console.log(data);
      this.newProduct = data;
    })
  }

  updateProduct(): any {
    let updateData = {
      username: this.username,
      productID: '8',
      name: 'componentA',
      newState: '3',
      updatedTime: '1552721600',
      owner: 'MagnetoCorp',
      hasNewOwner: 'false',
      newOwner: 'N/A',
    }

    this.productApiService.updateProduct(updateData)
    .subscribe((data: any) => {
      console.log(data);
      this.updatedProduct = data;
    })
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
      this.allProducts = data;

      this.datasource_all_products = this.getDataSource(data);
      this.datasource_search = this.getDataSource(data);
      this.datasource_history = this.getDataSource(data);
      console.log(this.datasource_all_products);
    })
  }

  queryProduct(): any {
    let queryOne = {
      username: this.username,
      productID: '1',
    }

    //query a specific product by product name, owner, productID
    this.productApiService.queryProduct(queryOne)
    .subscribe((data: any) => {
      console.log(data);
      this.query_product = data;
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
      this.all_history_of_product = data;
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