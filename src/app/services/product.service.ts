import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductData } from '../models/product-data';
import { environment } from '../../environments/environment.development';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.APIBaseUrl}/Products`;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/getAllProducts`);
  }

  addProduct(Product: ProductData): Observable<ApiResponse> {
    return this.http.post<any>(`${this.baseUrl}/createProduct`, Product);
  }

  updateProduct(ProductId: number, Product: ProductData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateProduct/${ProductId}`, Product);
  }

  deleteProduct(ProductId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteProduct/${ProductId}`);
  }
}
