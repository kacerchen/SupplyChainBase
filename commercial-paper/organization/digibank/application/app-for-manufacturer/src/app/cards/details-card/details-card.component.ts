import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.css']
})
export class DetailsCardComponent implements OnInit {

  @Input() process: any;

  selectedLotNum: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  toFormatDate(time: any): string{
    if(time.length == 10) {
      return formatDate(Number(time *1000), 'medium', 'en-US');
    } else if(time.length == 13) {
      return formatDate(Number(time), 'medium', 'en-US');      
    }
  }

  setSelected(lotNumber: string) {
    this.selectedLotNum = lotNumber;
  }

}
