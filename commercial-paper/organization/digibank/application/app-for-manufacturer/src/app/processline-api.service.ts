import { Injectable } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcesslineApiService {

  constructor(private http: HttpClient) { }

  initProcessLineLedger(username: string): Observable<any>{
    return this.http.get('/api_init_processlineLedger', {params: {username: username}});
  }

  initProcessLine(data: Object): Observable<any>{
    return this.http.post('/api_new_processline', data);
  }

  updateProcessLine(data: Object): Observable<any>{
    return this.http.post('/api_update_processline', data);
  }

  endProcessLine(data: Object): Observable<any>{
    return this.http.post('/api_end_processline', data);
  }

  queryAllProcesses(data: Object): Observable<any>{
    return this.http.post('/api_query_all_processes', data);
  }

  queryProcess(data: Object): Observable<any>{
    return this.http.post('/api_query_process', data);
  }

  getHistoryByKey(data: Object): Observable<any>{
    return this.http.post('/api_query_processline_history', data);
  }

}
