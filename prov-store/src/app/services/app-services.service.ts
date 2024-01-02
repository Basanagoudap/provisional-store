import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  constructor(private http: HttpClient) { }

  getOwnerData(){
    return this.http.get('/api/getData')
  }
}
