import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userPermissionGuard } from './user-permission.guard';

describe('userPermissionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userPermissionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
