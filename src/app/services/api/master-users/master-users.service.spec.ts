import { TestBed } from '@angular/core/testing';

import { MasterUsersService } from './master-users.service';

describe('MasterUsersService', () => {
  let service: MasterUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
