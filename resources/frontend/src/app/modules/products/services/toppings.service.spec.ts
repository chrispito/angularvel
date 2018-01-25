import { TestBed, inject } from '@angular/core/testing';

import { ToppingsService } from './toppings.service';

describe('ToppingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToppingsService]
    });
  });

  it('should be created', inject([ToppingsService], (service: ToppingsService) => {
    expect(service).toBeTruthy();
  }));
});
