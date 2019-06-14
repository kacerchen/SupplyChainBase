import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-final-product-list',
  templateUrl: './final-product-list.component.html',
  styleUrls: ['./final-product-list.component.css']
})
export class FinalProductListComponent implements OnInit {

  @Input() all_products: any;
  @Input() username: string;

  finalProducts: any;
  availFinalProducts: any;
  soldFinalProducts: any;
  selectedProduct: any;

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.all_products) {
      this.finalProducts = this.filterFinal(this.all_products);
      this.availFinalProducts = this.finalProducts[0];
      this.soldFinalProducts = this.finalProducts[1];
    }
  }

  filterFinal(arr: any): any {
    let tempArr = [];
    let tempArr2 = [];

    for(let obj of arr) {
      if(obj['currentState'] == '5'){
        tempArr.push(obj);
      } else if(obj['currentState'] == '7' || obj['currentState'] == '8' || obj['currentState'] == '9'){
        tempArr2.push(obj);
      }
    }

    // console.log(tempArr);

    return [tempArr, tempArr2];
  }

  setSelectedProduct(product: any): void {
    this.selectedProduct = product;
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

}
