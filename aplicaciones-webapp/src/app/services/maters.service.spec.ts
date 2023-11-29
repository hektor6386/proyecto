import { TestBed } from '@angular/core/testing';

import { MatersService } from './maters.service';

describe('MatersService', () => {
  let service: MatersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
