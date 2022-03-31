import { TestBed } from '@angular/core/testing';

import { HttpRequestLoadingInterceptor } from './http-request-loading.interceptor';

describe('HttpRequestLoadingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpRequestLoadingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpRequestLoadingInterceptor = TestBed.inject(HttpRequestLoadingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
