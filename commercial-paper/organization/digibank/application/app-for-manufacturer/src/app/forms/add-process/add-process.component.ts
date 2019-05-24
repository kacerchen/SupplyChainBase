import { Component, OnInit } from '@angular/core';
import { ProcesslineApiService } from '../../processline-api.service';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

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

  addNewProcessline(): any {
    this.createdTime = new Date().getTime().toString();

    let data = {
      username: this.username,
      lotNumber: this.lotNumber.toString(),
      component: this.component,
      containerID: this.containerID,
      manufacturer: this.username,
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
