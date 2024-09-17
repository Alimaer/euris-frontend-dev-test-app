import { TestBed } from '@angular/core/testing';
import { StoreCallerService } from './store-caller.service';

describe('StoreService', () => {
  let service: StoreCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
