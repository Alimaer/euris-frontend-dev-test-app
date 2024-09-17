import { TestBed } from '@angular/core/testing';
import { ProductsCallerService } from './products-caller.service';

describe('ProductsServiceService', () => {
  let service: ProductsCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
