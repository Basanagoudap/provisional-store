import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppServicesService {
  apiUrl = 'http://localhost:3000';
  headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getCustomerByEmail(email): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customer/${email}`);
  }

  addNewCustomer(body): Observable<any[]> {
    console.log(body, `${this.apiUrl}/customer/post`);

    return this.http.post<any>(`${this.apiUrl}/customer/post`, JSON.stringify(body), {
      headers: this.headers
    });
  }

  getOwnerByEmail(email){
    return this.http.get<any[]>(`${this.apiUrl}/owner/${email}`);
  }
  
  getAllProducts(){
    return this.http.get<any[]>(`${this.apiUrl}/product/getAll`);
  }
  
  getProductByName(string){
    return this.http.get<any[]>(`${this.apiUrl}/product/search/${string}`);
  }
}
