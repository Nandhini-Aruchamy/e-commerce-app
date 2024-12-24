import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { ProductsService } from '../../services/products/products.service';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockProductService: ProductsService;
  let mockCartService: CartService;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj<ProductsService>(
      'ProductService',
      {
        getAllProducts: of([{ id: 1 }, { id: 2 }]),
      }
    );
    mockCartService = jasmine.createSpyObj<CartService>('CartService', {
      addToCart: undefined,
    });
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: ProductsService, useValue: mockProductService },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('product service should be called', () => {
    expect(mockProductService.getAllProducts).toHaveBeenCalled();
    expect(component.productList()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('cart service should be called', () => {
    component.onAddToCart({
      id: 1,
      title: 'dress',
      price: 123,
      description: "girl's dress",
      category: 'cloths',
      image: '',
      rating: { rate: 5, count: 5 },
    });
    expect(mockCartService.addToCart).toHaveBeenCalled();
  });
});
