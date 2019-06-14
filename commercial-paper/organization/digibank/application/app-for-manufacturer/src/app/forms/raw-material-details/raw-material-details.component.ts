import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-raw-material-details',
  templateUrl: './raw-material-details.component.html',
  styleUrls: ['./raw-material-details.component.css']
})
export class RawMaterialDetailsComponent implements OnInit {

  @Input() product: any;
  @Input() username: string;

  productId: string;
  name: string;
  weight: string;
  supplier: string;
  from: string;
  state: string;
  time: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.product) {
      console.log(this.product);
      this.productId = this.product.productID;
      this.name = this.product.name;
      this.weight = this.product.weight;
      this.supplier = this.product.supplier;
      this.from = this.extractFirstText(this.product.from);
      this.time = this.toFormatDate(this.product.createdTime);
      this.getStringState(this.product.currentState);
    }
  }

  extractFirstText(str): string{
    const matches = str.match(/"(.*?)"/);
    return matches
      ? matches[1]
      : str;
  }

  getStringState(num: string): void {
    switch(num) {
      case '1':
        this.state = 'Init';
        break;
      case '3':
        this.state = 'Ready for use';
        break;
      case '6':
        this.state = 'Used';
        break;
    }
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

}
