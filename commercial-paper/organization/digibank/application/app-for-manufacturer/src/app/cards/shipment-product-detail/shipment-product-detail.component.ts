import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-shipment-product-detail',
  templateUrl: './shipment-product-detail.component.html',
  styleUrls: ['./shipment-product-detail.component.css']
})
export class ShipmentProductDetailComponent implements OnInit {

  @Input() productId: any;
  @Input() weight: any;
  @Input() receiver: any;
  @Input() orderer: any;
  @Input() createdAt: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  toFormatDate(time: any): string{
    return formatDate(Number(time *1000), 'medium', 'en-US');
  }

}
