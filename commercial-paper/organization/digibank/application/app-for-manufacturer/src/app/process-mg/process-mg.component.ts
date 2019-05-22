import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ProcesslineApiService } from '../processline-api.service';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process-mg',
  templateUrl: './process-mg.component.html',
  styleUrls: ['./process-mg.component.css']
})
export class ProcessMgComponent implements OnInit {

  data: Object = {
    username: 'User1@org1.example.com',
    lotNumber: '00001',
    component: 'componentA',
    containerID: 'CT-123',
    manufacturer: 'MagnetoCorp',
    createdTime: '1552521600',
    weight: '450',
    temperature: '35',
    expectedProduct: 'drugA'
  }

  updateData: Object = {
    username: 'User1@org1.example.com',
    lotNumber: '00001',
    component: 'componentB',
    containerID: 'CT-456',
    newState: '2',
    manufacturer: 'MagnetoCorp',
    updatedTime: '1552541600',
    weight: '330',
    temperature: '67',
    expectedProduct: 'drugA'
  }

  finalData: Object = {
    username: 'User1@org1.example.com',
    lotNumber: '00001',
    component: 'drugA',
    containerID: 'CT-789',
    manufacturer: 'MagnetoCorp',
    updatedTime: '1552621600',
    weight: '600',
    temperature: '25',
    expectedProduct: 'drugA'
  }

  queryAll: Object = {
    username: 'User1@org1.example.com',
    lotNumber: '00001',
    manufacturer: 'MagnetoCorp',
    expectedProduct: 'drugA'
  }

  queryOne: Object = {
    username: 'User1@org1.example.com',
    lotNumber: '00002',
    manufacturer: 'MagnetoCorp',
    expectedProduct: 'drugB'
  }

  queryHistory: Object = {
    username: 'User1@org1.example.com',
    lotNumber: '00001',
    manufacturer: 'MagnetoCorp',
    expectedProduct: 'drugA'
  }

  username: string;

  newProcessline: Object;
  update_processline: Object;
  final_processline: Object;
  all_processes: Object;
  query_process: Object;
  all_history_of_process: Object;
  datasource_all: any;
  datasource_search: any;
  datasource_latest: any;
  datasource_history: any;

  constructor(private route: ActivatedRoute, private processlineApiService: ProcesslineApiService) { 
    
    // this.queryAllProcesses();
    
    // this.http.post('/api', this.data)
    //   .subscribe((data: any) => {
    //     console.log(data);
    //   })

    // this.http.get('/api', {params: {username: this.username}})
    // .subscribe((data: any) => {
    //   console.log(data);
    // })

    // fetch('/api')
    //   .then(res => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     console.log(data.init);
    //     }
    //   )
  }

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

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
  }

  initProcessLineLedger(): any {
    this.processlineApiService.initProcessLineLedger(this.username)
    .subscribe((data: any) => {
      console.log(data);
    })
  }

  addNewProcessline(): any {
    let data = {
      username: this.username,
      lotNumber: '00007',
      component: 'componentA',
      containerID: 'CT-123',
      manufacturer: 'MagnetoCorp',
      createdTime: '1552521600',
      weight: '450',
      temperature: '35',
      expectedProduct: 'drugA'
    }

    this.processlineApiService.initProcessLine(data)
    .subscribe((data: any) => {
      console.log(data);
      this.newProcessline = data;
    })
  }

  updateProcessline(): any {
    let updateData = {
      username: this.username,
      lotNumber: '00001',
      component: 'componentB',
      containerID: 'CT-456',
      newState: '3',
      manufacturer: 'MagnetoCorp',
      updatedTime: '1552541600',
      weight: '330',
      temperature: '67',
      expectedProduct: 'drugA'
    }

    this.processlineApiService.updateProcessLine(updateData)
    .subscribe((data: any) => {
      console.log(data);
      this.update_processline = data;
    })
  }

  endProcessline(): any {
    let finalData = {
      username: this.username,
      lotNumber: '00001',
      component: 'drugA',
      containerID: 'CT-789',
      manufacturer: 'MagnetoCorp',
      updatedTime: '1552621600',
      weight: '600',
      temperature: '25',
      expectedProduct: 'drugA'
    }

    this.processlineApiService.endProcessLine(finalData)
    .subscribe((data: any) => {
      console.log(data);
      this.final_processline = data;
    })
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

      this.datasource_latest = this.getDataSource(data);
      this.datasource_search = this.getDataSource(data);
      this.datasource_all = this.getDataSource(data);
      console.log(this.datasource_latest);
    })
  }

  queryProcess(): any {
    let queryOne = {
      username: this.username,
      lotNumber: '00002',
    }

    //query a specific process by expected product, manufacturer, lotNumber
    this.processlineApiService.queryProcess(queryOne)
    .subscribe((data: any) => {
      console.log(data);
      this.query_process = data;
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
      // console.log(j['Record']);
      finalArr.push(j['Record']);      
    }
    return finalArr;
    // console.log(_to);
  }

}

export interface Result {
  processline: Object; 
}