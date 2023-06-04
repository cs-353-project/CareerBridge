import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import {
  JobAdFilterRequestModel,
  JobAdvertisementRequestModel,
  JobApplicationRequestModel,
  JobApplicationUpdateRequestModel
} from '../_models/job_ad_models';

@Injectable({
  providedIn: 'root'
})
export class JobAdService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getJobAds(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'job-ad/' + id.toString());
  }

  addJobAd(jobAd: JobAdvertisementRequestModel): Observable<any> {
    return this.http.post(this.baseUrl + 'job-ad', jobAd);
  }

  deleteJobAd(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'job-ad/', { body: { ad_id: id } });
  }

  filterJobAds(filter: JobAdFilterRequestModel): Observable<any> {
    return this.http.post(this.baseUrl + 'jobapplications/filter', filter);
  }

  addJobApplication(
    job_application: JobApplicationRequestModel
  ): Observable<any> {
    return this.http.post(this.baseUrl + 'job-applications', job_application);
  }

  deleteJobApplication(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'job-applications/', {
      body: { application_id: id }
    });
  }

  updateJobApplication(
    application_id: number,
    response: JobApplicationUpdateRequestModel
  ): Observable<any> {
    return this.http.put(
      this.baseUrl + 'job-applications/' + application_id,
      response
    );
  }
}
