import { TestBed } from '@angular/core/testing';

import { TypeuserService } from './typeuser.service';

describe('TypeuserService', () => {
  let service: TypeuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
