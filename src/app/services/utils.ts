import { PaginationRequest } from '../models/PaginationRequest';
import { HttpParams } from '@angular/common/http';

export class Utils {
  static getOrDefaultHttpParams(pagination: PaginationRequest | undefined) {
    let limit = pagination?.limit;
    let skip = pagination?.skip;

    let httpParams = new HttpParams();
    if (limit != undefined && skip != undefined) {
      httpParams = httpParams.set('limit', limit).set('skip', skip);
    }

    return httpParams;
  }
}
