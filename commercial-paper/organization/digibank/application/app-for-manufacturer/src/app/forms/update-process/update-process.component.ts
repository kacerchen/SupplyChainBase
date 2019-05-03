import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
