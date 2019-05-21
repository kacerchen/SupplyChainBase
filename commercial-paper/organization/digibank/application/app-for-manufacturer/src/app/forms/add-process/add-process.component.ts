import { Component, OnInit } from '@angular/core';
import { ProcesslineApiService } from '../../processline-api.service';

@Component({
  selector: 'app-add-process',
  templateUrl: './add-process.component.html',
  styleUrls: ['./add-process.component.css']
})
export class AddProcessComponent implements OnInit {

  username: string;
  lotNumber: string;
  component: string;
  containerID: string;
  manufacturer: string;
  createdTime: string;
  weight: string;
  temperature: string;
  expectedProduct: string;

  newProcessline: Object;

  constructor(private processlineApiService: ProcesslineApiService) { }

  ngOnInit() {
  }

  addNewProcessline(): any {
    this.createdTime = new Date().getTime().toString();
    this.username = 'User1@org1.example.com';
    this.manufacturer = 'User1@org1.example.com';

    let data = {
      username: this.username,
      lotNumber: this.lotNumber.toString(),
      component: this.component,
      containerID: this.containerID,
      manufacturer: this.manufacturer,
      createdTime: this.createdTime,
      weight: this.weight.toString(),
      temperature: this.temperature.toString(),
      expectedProduct: this.expectedProduct
    }

    this.processlineApiService.initProcessLine(data)
    .subscribe((data: any) => {
      console.log(data);
      this.newProcessline = data;
    })
  }

}
