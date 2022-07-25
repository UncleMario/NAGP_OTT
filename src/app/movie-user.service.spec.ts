import { TestBed } from '@angular/core/testing';

import { MovieUserService } from './movie-user.service';

describe('MovieUserService', () => {
  let service: MovieUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
