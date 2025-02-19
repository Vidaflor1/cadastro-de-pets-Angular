import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { petResolverGuard } from './pet-resolver.guard';

describe('petResolverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => petResolverGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
