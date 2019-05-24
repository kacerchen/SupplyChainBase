import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../../product-api.service';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

export enum StateOptions {
  REPACKAGING = "2",
  READYTOUSE = "3",
  PROCESSING = "4",
  READYTOORDER = "5",
  USED = "6",
  SOLDOUT = "7",
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  keys = Object.keys;
  stateOptions = StateOptions;
  state: number;
  
  username: string;
  productID: string;
  name: string;
  newState: string;
  updatedTime: string;
  owner: string;
  hasNewOwner: boolean = false;
  newOwner: string;

  updatedProduct: Object;

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

  updateProduct(): any {
    this.updatedTime = new Date().getTime().toString();

    let data = {
      username: this.username,
      productID: this.productID.toString(),
      name: this.name,
      newState: this.newState,
      updatedTime: this.updatedTime,
      owner: this.username,
      hasNewOwner: this.hasNewOwner.toString(),
      newOwner: this.newOwner
    }

    this.productApiService.updateProduct(data)
    .subscribe((data: any) => {
      console.log(data);
      this.updatedProduct = data;
    })
  }

}
