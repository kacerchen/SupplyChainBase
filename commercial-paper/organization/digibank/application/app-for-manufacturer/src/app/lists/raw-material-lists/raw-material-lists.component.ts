import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-raw-material-lists',
  templateUrl: './raw-material-lists.component.html',
  styleUrls: ['./raw-material-lists.component.css']
})
export class RawMaterialListsComponent implements OnInit {

  @Input() all_products: any;
  @Input() username: string;

  rawMaterials: any;
  availRawMaterials: any;
  usedRawMaterials: any;
  selectedRawMaterial: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.all_products) {
      this.rawMaterials = this.filter(this.all_products);
      this.availRawMaterials = this.rawMaterials[0];
      this.usedRawMaterials = this.rawMaterials[1];
    }
  }

  filter(arr: any): any {
    let tempArr = [];
    let tempArr2 = [];

    for(let obj of arr) {
      if(obj['type'] == '1'|| obj['type'] == '2'){
        if(obj['currentState'] == '1' || obj['currentState'] == '3'){
          tempArr.push(obj);
        } else if(obj['currentState'] == '6'){
          tempArr2.push(obj);
        }
      }
    }

    console.log(tempArr);

    return [tempArr, tempArr2];
  }

  setSelectedProduct(product: any): void {
    this.selectedRawMaterial = product;
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

}
