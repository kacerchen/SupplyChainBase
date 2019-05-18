import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcesslineApiService } from '../processline-api.service';

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

  username: string = 'User1@org1.example.com'

  newProcessline: Object;
  update_processline: Object;
  final_processline: Object;
  all_processes: Object;
  query_process: Object;
  all_history_of_process: Object;

  constructor(private http: HttpClient, private processlineApiService: ProcesslineApiService) { 
    
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
    this.getHistoryByKey();
  }

  initProcessLineLedger(): any {
    this.processlineApiService.initProcessLineLedger(this.username)
    .subscribe((data: any) => {
      console.log(data);
    })
  }

  addNewProcessline(): any {
    this.processlineApiService.initProcessLine(this.data)
    .subscribe((data: any) => {
      console.log(data);
      this.newProcessline = data;
    })
  }

  updateProcessline(): any {
    this.processlineApiService.updateProcessLine(this.updateData)
    .subscribe((data: any) => {
      console.log(data);
      this.update_processline = data;
    })
  }

  endProcessline(): any {
    this.processlineApiService.endProcessLine(this.finalData)
    .subscribe((data: any) => {
      console.log(data);
      this.final_processline = data;
    })
  }

  queryAllProcesses(): any {
    //query all processes with same expected product, manufacturer but different lotNumber
    this.processlineApiService.queryAllProcesses(this.queryAll)
    .subscribe((data: any) => {
      console.log(data);
      this.all_processes = data;
    })
  }

  queryProcess(): any {
    //query a specific process by expected product, manufacturer, lotNumber
    this.processlineApiService.queryProcess(this.queryOne)
    .subscribe((data: any) => {
      console.log(data);
      this.query_process = data;
    })
  }

  getHistoryByKey(): any {
    //query processes with same expected product, manufacturer, lotNumber
    this.processlineApiService.getHistoryByKey(this.queryHistory)
    .subscribe((data: any) => {
      console.log(data);
      this.all_history_of_process = data;
    })
  }

}
