import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartsResponse } from '../models/CartsResponse';
import { Cart } from '../models/cart';
import { PaginationRequest } from '../models/PaginationRequest';
import { Utils } from './utils';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  apiUrl = environment.apiUrl + '/carts';

  constructor(private http: HttpClient) {}

  getCarts(pagination?: PaginationRequest): Observable<CartsResponse> {
    let httpParams = Utils.getOrDefaultHttpParams(pagination);
    let url = this.apiUrl;
    return this.http.get<CartsResponse>(url, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: httpParams,
    });
  }

  getCart(cartId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${cartId}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  getCartsOfUser(userId: number): Observable<CartsResponse> {
    return this.http.get<CartsResponse>(`${this.apiUrl}/user/${userId}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  addCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/add`, cart, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  updateCart(cartId: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/${cartId}`, cart, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteCart(cartId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/${cartId}`);
  }
}
