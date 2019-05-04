import { Component, OnInit } from '@angular/core';

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
  type: number;

  constructor() { }

  ngOnInit() {
  }

}
