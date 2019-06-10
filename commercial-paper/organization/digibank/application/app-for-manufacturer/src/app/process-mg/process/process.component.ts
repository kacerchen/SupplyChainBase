import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ProcesslineApiService } from '../../processline-api.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  username: string;

  all_processes: Object;
  all_history_of_process: Object;
  datasource_all: any;
  datasource_search: any;
  datasource_history: any;

  constructor(private route: ActivatedRoute, private processlineApiService: ProcesslineApiService) { }

  ngOnInit() {
    this.route
      .queryParamMap
      .pipe(map(params => params.get('username') || 'None'))
      .subscribe(username => {
        console.log(username);
        this.username = username
      })

    this.queryAllProcesses();
  }

  queryAllProcesses(): any {
    let queryAll = {
      username: this.username,
      lotNumber: '00001',
    }
    //query all processes with same expected product, manufacturer but different lotNumber
    this.processlineApiService.queryAllProcesses(queryAll)
    .subscribe((data: any) => {
      console.log(data);
      this.all_processes = data;

      this.datasource_search = this.getDataSource(data);
      this.datasource_all = this.getDataSource(data);
    })
  }

  getHistoryByKey(): any {
    let queryHistory = {
      username: this.username,
      lotNumber: '00001',
    }

    //query processes with same expected product, manufacturer, lotNumber
    this.processlineApiService.getHistoryByKey(queryHistory)
    .subscribe((data: any) => {
      console.log(data);
      this.all_history_of_process = data;

      this.datasource_history = this.getDataSource(data);
      console.log(this.datasource_history);
    })
  }

  getDataSource(obj: Result): any {
    let records = obj.processline;
    let tempArr = [];
    let finalArr = [];

    for(let i of Object.keys(records)){
      if(i != 'class' && i != 'currentState' && i != 'key') {
        tempArr.push(records[i]);
      }
    }

    for(let j of tempArr){
      finalArr.push(j['Record']);      
    }
    return finalArr;
  }

}

export interface Result {
  processline: Object; 
}