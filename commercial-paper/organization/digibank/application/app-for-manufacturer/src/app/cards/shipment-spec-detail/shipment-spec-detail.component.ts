import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-shipment-spec-detail',
  templateUrl: './shipment-spec-detail.component.html',
  styleUrls: ['./shipment-spec-detail.component.css']
})
export class ShipmentSpecDetailComponent implements OnInit {

  @Input() detail: any;
  @Input() method: any;
  @Input() operator: any;
  @Input() leadtime: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}
