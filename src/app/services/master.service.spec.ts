import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { of } from 'rxjs';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('MasterService', () => {
  let service: MasterService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(MasterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifies no unmatched requests are outstanding
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAPICall should be called and return observable data', (done: DoneFn) => {
    let apiMethod = 'products';
    let mockedData = [{ id: 1 }, { id: 2 }];

    service.getAPICall(apiMethod).subscribe((data) => {
      expect(data).toEqual(mockedData);
      done();
    });
    const req = httpTestingController.expectOne(service.baseURL + apiMethod);
    expect(req.request.method).toBe('GET');
    req.flush(mockedData);
  });

  it('getAPICall should be called and handle HTTP errors gracefully', (done: DoneFn) => {
    let apiMethod = 'non-existent-endpoint';
    const mockError = { status: 404, statusText: 'Not Found' };

    service.getAPICall('non-existent-endpoint').subscribe({
      next: () => fail('Expected an error, not a response'),
      error: (error) => {
        // Verify error handling
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
        done();
      },
    });

    const req = httpTestingController.expectOne(service.baseURL + apiMethod);
    expect(req.request.method).toBe('GET');
    req.flush({}, mockError);
  });
});
