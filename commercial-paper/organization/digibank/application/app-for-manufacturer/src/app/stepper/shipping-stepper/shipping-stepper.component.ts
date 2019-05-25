import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-stepper',
  templateUrl: './shipping-stepper.component.html',
  styleUrls: ['./shipping-stepper.component.css']
})
export class ShippingStepperComponent implements OnInit {

  @Input() trackdata: TrackData;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  address: string;
  dispatchDate: string;
  shipMethod: string;
  tradeTerm: string;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if(this.trackdata != undefined){
      console.log(this.trackdata.orders);
      let order = this.trackdata.orders;
      
      this.address = order.shippingObj.address; 
      this.dispatchDate = order.shippingObj.dispatchDate;
      this.shipMethod  = order.shippingObj.shipMethod;
      this.tradeTerm  = order.shippingObj.tradeTerm;
    }
  }

}

export interface TrackData {
  orders: {
    shippingObj: {
      address: string,
      dispatchDate: string,
      shipMethod: string,
      tradeTerm: string
    }
  }; 
}