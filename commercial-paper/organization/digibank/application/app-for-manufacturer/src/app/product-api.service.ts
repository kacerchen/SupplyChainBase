import { Injectable } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http: HttpClient) { }

  initProductLedger(username: string): Observable<any>{
    return this.http.get('/api_init_productLedger', {params: {username: username}});
  }

  initProduct(data: Object): Observable<any>{
    return this.http.post('/api_new_product', data);
  }

  updateProduct(data: Object): Observable<any>{
    return this.http.post('/api_update_product', data);
  }

  queryAllProducts(data: Object): Observable<any>{
    return this.http.post('/api_query_all_products', data);
  }

  queryProduct(data: Object): Observable<any>{
    return this.http.post('/api_query_product', data);
  }

  getHistoryByKey(data: Object): Observable<any>{
    return this.http.post('/api_query_product_history', data);
  }

}
