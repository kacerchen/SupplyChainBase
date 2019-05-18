import { Injectable } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private http: HttpClient) { }

  initOrderLedger(username: string): Observable<any>{
    return this.http.get('/api_init_orderLedger', {params: {username: username}});
  }

  initOrder(data: Object): Observable<any>{
    return this.http.post('/api_new_order', data);
  }

  modifyOrder(data: Object): Observable<any>{
    return this.http.post('/api_modified_order', data);
  }

  updateOrder(data: Object): Observable<any>{
    return this.http.post('/api_updated_order_status', data);
  }

  queryAllOrders(data: Object): Observable<any>{
    return this.http.post('/api_query_all_orders', data);
  }

  queryOrder(data: Object): Observable<any>{
    return this.http.post('/api_query_order', data);
  }

  getHistoryByKey(data: Object): Observable<any>{
    return this.http.post('/api_query_order_history', data);
  }

}
