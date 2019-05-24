import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../../product-api.service';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private productApiService: ProductApiService) { }

  ngOnInit() {
    this.route
      .queryParamMap
      .pipe(map(params => params.get('username') || 'None'))
      .subscribe(username => {
        console.log(username);
        this.username = username
      })
  }

  addNewProduct(): any {
    this.createdTime = new Date().getTime().toString();

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
      owner: this.username
    }

    this.productApiService.initProduct(data)
    .subscribe((data: any) => {
      console.log(data);
      this.newProduct = data;
    })
  }

}
