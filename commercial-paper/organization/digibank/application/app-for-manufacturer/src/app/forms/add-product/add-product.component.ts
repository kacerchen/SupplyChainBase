import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../../product-api.service';

export enum TypeOptions {
  ORIGINAL = "1",
  RAWMATERIAL = "2",
  FINAL = "3",
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  keys = Object.keys;
  typeOptions = TypeOptions;
  
  username: string;
  productID: string;
  name: string;
  type: string;
  from: string;
  processline: string;
  createdTime: string;
  weight: string;
  supplier: string;
  owner: string;

  newProduct: Object;

  constructor(private productApiService: ProductApiService) { }

  ngOnInit() {
  }

  addNewProduct(): any {
    this.createdTime = new Date().getTime().toString();
    this.username = 'User1@org1.example.com';
    this.owner = 'User1@org1.example.com';

    let data = {
      username: this.username,
      productID: this.productID.toString(),
      name: this.name,
      type: this.type,
      from: this.from,
      processline: this.processline,
      createdTime: this.createdTime,
      weight: this.weight.toString(),
      supplier: this.supplier,
      owner: this.owner
    }

    this.productApiService.initProduct(data)
    .subscribe((data: any) => {
      console.log(data);
      this.newProduct = data;
    })
  }

}
