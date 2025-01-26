import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { MasterService } from '../master.service';
import { of } from 'rxjs';

describe('ProductsService', () => {
  let service: ProductsService;
  let spyMasterService: jasmine.SpyObj<MasterService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MasterService', ['getAPICall']);
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: MasterService, useValue: spy },
      ],
    });
    service = TestBed.inject(ProductsService);
    spyMasterService = TestBed.inject(
      MasterService
    ) as jasmine.SpyObj<MasterService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MasterService.getAPICall with "products" and return expected data', (done: DoneFn) => {
    let mockedProducts = [{ id: 1 }, { id: 2 }];
    spyMasterService.getAPICall.and.returnValue(of(mockedProducts));

    //service.getAllProducts();

    service.getAllProducts().subscribe((products) => {
      expect(spyMasterService.getAPICall).toHaveBeenCalledOnceWith('products');
      expect(products).toEqual(mockedProducts);
    });

    done();
  });
});
