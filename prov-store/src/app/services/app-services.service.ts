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

  updateCustomerCart(id, body): Observable<any[]> {
    return this.http.put<any>(`${this.apiUrl}/customer/update/${id}`, JSON.stringify(body), { headers: this.headers });
  }

  addNewCustomer(body): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/customer/post`, JSON.stringify(body), {
      headers: this.headers
    });
  }

  addNewProduct(body): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/product/post`, JSON.stringify(body), {
      headers: this.headers
    });
  }

  getCustomerCartLength(email): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customer/cart-length/${email}`);
  }

  updateProduct(id, body): Observable<any[]> {
    return this.http.put<any>(`${this.apiUrl}/product/update/${id}`, JSON.stringify(body), { headers: this.headers });
  }

  deleteProducById(productId){
    return this.http
    .delete<any[]>(`${this.apiUrl}/product/delete/${productId}`)
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

  getOrdersByStatus(status){
    return this.http.get<any[]>(`${this.apiUrl}/orders/filter?status=${status}`);
  }
  
  getAllOrders(){
    return this.http.get<any[]>(`${this.apiUrl}/orders/getAll`);
  }
}
