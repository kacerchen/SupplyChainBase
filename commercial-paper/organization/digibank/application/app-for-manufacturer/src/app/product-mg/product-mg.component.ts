import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductApiService } from '../product-api.service';

@Component({
  selector: 'app-product-mg',
  templateUrl: './product-mg.component.html',
  styleUrls: ['./product-mg.component.css']
})
export class ProductMgComponent implements OnInit {

  username: string = 'User1@org1.example.com';

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
    owner: 'MagnetoCorp',
    name: 'drugA',
    productID: '4',
  }

  queryOne: Object = {
    username: 'User1@org1.example.com',
    owner: 'MagnetoCorp',
    name: 'componentA',
    productID: '1',
  }

  queryHistory: Object = {
    username: 'User1@org1.example.com',
    owner: 'MagnetoCorp',
    name: 'drugA',
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

  constructor(private productApiService: ProductApiService) { }

  ngOnInit() {
    this.queryAllProducts();
  }

  initProductLedger(): any {
    this.productApiService.initProductLedger(this.username)
    .subscribe((data: any) => {
      console.log(data);
    })
  }

  addNewProduct(): any {
    this.productApiService.initProduct(this.data)
    .subscribe((data: any) => {
      console.log(data);
      this.newProduct = data;
    })
  }

  updateProduct(): any {
    this.productApiService.updateProduct(this.updateData)
    .subscribe((data: any) => {
      console.log(data);
      this.updatedProduct = data;
    })
  }

  queryAllProducts(): any {
    //query all products with same product name, owner but different productID
    this.productApiService.queryAllProducts(this.queryAll)
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
    //query a specific product by product name, owner, productID
    this.productApiService.queryProduct(this.queryOne)
    .subscribe((data: any) => {
      console.log(data);
      this.query_product = data;
    })
  }

  getHistoryByKey(): any {
    //query product with same product name, owner, productID
    this.productApiService.getHistoryByKey(this.queryHistory)
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