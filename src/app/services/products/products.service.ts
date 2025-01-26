import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MasterService } from '../master.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  masterService = inject(MasterService);

  getAllProducts(): Observable<any> {
    return this.masterService.getAPICall('products');
  }
}
