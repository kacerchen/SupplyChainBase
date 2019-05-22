import { Injectable } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private http: HttpClient) { }

  register(username: string, role: string, mspID: string): Observable<any>{
    return this.http.get('/api_signup', {params: {username: username, role: role, mspID: mspID}});
  }

  login(username: string): Observable<any>{
    return this.http.get('/api_login', {params: {username: username}});
  }

}
