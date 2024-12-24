import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  baseURL: string = 'https://fakestoreapi.com/';

  http = inject(HttpClient);

  getAPICall(method: string): Observable<any> {
    let url = `${this.baseURL}${method}`;
    return this.http.get(url);
  }
}
