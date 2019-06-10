import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ProcesslineApiService } from '../../processline-api.service';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

export enum StateOptions {
  FEEDING = "2",
  REACTING = "3",
  TRANSIT = "4",
}

@Component({
  selector: 'app-update-process',
  templateUrl: './update-process.component.html',
  styleUrls: ['./update-process.component.css']
})

export class UpdateProcessComponent implements OnInit {

  @Input() selectedLotNum: any;

  keys = Object.keys;
  stateOptions = StateOptions;
  state: number;

  username: string;
  lotNumber: string;
  component: string;
  containerID: string;
  newState: string;
  manufacturer: string;
  updatedTime: string;
  weight: string;
  temperature: string;
  expectedProduct: string;

  update_processline: Object;

  constructor(private route: ActivatedRoute, private processlineApiService: ProcesslineApiService) { }

  ngOnInit() {
    this.route
      .queryParamMap
      .pipe(map(params => params.get('username') || 'None'))
      .subscribe(username => {
        console.log(username);
        this.username = username
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if(this.selectedLotNum) {
      this.lotNumber = this.selectedLotNum;
    }
  }

  updateProcessline(): any {
    this.updatedTime = new Date().getTime().toString();

    let data = {
      username: this.username,
      lotNumber: this.lotNumber,
      component: this.component,
      containerID: this.containerID,
      newState: this.newState,
      manufacturer: this.username,
      updatedTime: this.updatedTime,
      weight: this.weight.toString(),
      temperature: this.temperature.toString(),
      expectedProduct: this.expectedProduct
    }

    this.processlineApiService.updateProcessLine(data)
    .subscribe((data: any) => {
      console.log(data);
      this.update_processline = data;
    })
  }

}
