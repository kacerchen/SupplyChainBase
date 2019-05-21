import { Component, OnInit } from '@angular/core';
import { ProcesslineApiService } from '../../processline-api.service';

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

  constructor(private processlineApiService: ProcesslineApiService) { }

  ngOnInit() {
  }

  updateProcessline(): any {
    this.updatedTime = new Date().getTime().toString();
    this.username = 'User1@org1.example.com';
    this.manufacturer = 'User1@org1.example.com';

    let data = {
      username: this.username,
      lotNumber: this.lotNumber.toString(),
      component: this.component,
      containerID: this.containerID,
      newState: this.newState,
      manufacturer: this.manufacturer,
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
