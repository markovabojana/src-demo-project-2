import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginationRequest } from '../models/PaginationRequest';
import { UsersResponse } from '../models/UsersResponse';
import { User } from '../models/user';
import { Utils } from './utils';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getUsers(pagination?: PaginationRequest): Observable<UsersResponse> {
    let httpParams = Utils.getOrDefaultHttpParams(pagination);
    let url = this.apiUrl;
    return this.http.get<UsersResponse>(url, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: httpParams,
    });
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  searchUsers(
    searchQuery: string,
    pagination?: PaginationRequest
  ): Observable<UsersResponse> {
    let httpParams = Utils.getOrDefaultHttpParams(pagination);

    searchQuery = searchQuery.trim();
    if (searchQuery) {
      httpParams = httpParams.set('q', searchQuery);
    }

    return this.http.get<UsersResponse>(`${this.apiUrl}/search`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: httpParams,
    });
  }

  limitAndSkipUsers(
    limit: number,
    skip: number,
    select: Array<string>
  ): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.apiUrl}`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: new HttpParams()
        .set('limit', limit)
        .set('skip', skip)
        .set('select', select.toString()),
    });
  }

  filterUsers(
    filters: Map<string, string>,
    pagination?: PaginationRequest
  ): Observable<UsersResponse> {
    let httpParams = Utils.getOrDefaultHttpParams(pagination);

    let firstEntry = filters.entries().next().value;
    if (firstEntry) {
      httpParams = httpParams
        .set('key', firstEntry[0])
        .set('value', firstEntry[1]);
    }

    return this.http.get<UsersResponse>(`${this.apiUrl}/filter`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      params: httpParams,
    });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteUser(userId: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}`);
  }
}
