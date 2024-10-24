import { TestBed } from '@angular/core/testing';

import { MasterGroupsService } from './master-groups.service';

describe('MasterGroupsService', () => {
  let service: MasterGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
