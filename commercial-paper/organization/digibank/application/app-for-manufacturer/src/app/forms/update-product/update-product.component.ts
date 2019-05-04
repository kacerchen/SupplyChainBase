import { Component, OnInit } from '@angular/core';

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
  hasNewOwner: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
