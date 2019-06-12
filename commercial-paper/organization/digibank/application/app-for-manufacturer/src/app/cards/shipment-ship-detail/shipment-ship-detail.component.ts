import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-shipment-ship-detail',
  templateUrl: './shipment-ship-detail.component.html',
  styleUrls: ['./shipment-ship-detail.component.css']
})
export class ShipmentShipDetailComponent implements OnInit {

  @Input() tradeTerm: any;
  @Input() method: any;
  @Input() address: any;
  @Input() dispatchDate: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}
