import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-shipment-pay-detail',
  templateUrl: './shipment-pay-detail.component.html',
  styleUrls: ['./shipment-pay-detail.component.css']
})
export class ShipmentPayDetailComponent implements OnInit {

  @Input() initPay: any;
  @Input() method: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}
