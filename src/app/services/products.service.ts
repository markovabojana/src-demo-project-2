import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginationRequest } from '../models/PaginationRequest';
import { ProductsResponse } from '../models/ProductsResponse';
import { Product } from '../models/product';
import { Utils } from './utils';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) {}

  getProducts(pagination?: PaginationRequest): Observable<ProductsResponse> {
    let httpParams = Utils.getOrDefaultHttpParams(pagination);

    return this.http.get<ProductsResponse>(this.apiUrl, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: httpParams,
    });
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  searchProducts(
    searchQuery: string,
    pagination?: PaginationRequest
  ): Observable<ProductsResponse> {
    let httpParams = Utils.getOrDefaultHttpParams(pagination);

    searchQuery = searchQuery.trim();
    if (searchQuery) {
      httpParams = httpParams.set('q', searchQuery);
    }

    return this.http.get<ProductsResponse>(`${this.apiUrl}/search`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: httpParams,
    });
  }

  limitAndSkipProducts(
    limit: number,
    skip: number,
    select: Array<string>
  ): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.apiUrl}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: new HttpParams()
        .set('limit', limit)
        .set('skip', skip)
        .set('select', select.toString()),
    });
  }

  getAllProductsCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.apiUrl}/categories`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  getProductsOfCategory(categoryName: string): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      `${this.apiUrl}/category/${categoryName}`,
      {
        headers: new HttpHeaders({ Accept: 'application/json' }),
      }
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/add`, product, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, product, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${productId}`);
  }
}
