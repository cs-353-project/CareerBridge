import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import {
  JobAdFilterRequestModel,
  JobAdvertisementRequestModel,
  JobAdvertisementResponseModel,
  JobApplicationResponseModel,
  JobApplicationRequestModel,
  JobApplicationUpdateRequestModel
} from '../_models/job_ad_models';

@Injectable({
  providedIn: 'root'
})
export class JobAdService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllJobAds(): Observable<any> {
    return this.http.get(this.baseUrl + 'job_ad');
  }

  getJobAds(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'job_ad/' + id.toString());
  }

  addJobAd(jobAd: JobAdvertisementRequestModel): Observable<any> {
    return this.http.post(this.baseUrl + 'job_ad', jobAd);
  }

  deleteJobAd(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'job_ad/', { body: { ad_id: id } });
  }

  filterJobAds(filter: JobAdFilterRequestModel): Observable<any> {
    const body = {
      pay_range_min: filter.pay_range_min,
      pay_range_max: filter.pay_range_max,
      type: filter.type,
      location: filter.location,
      setting: filter.setting,
      domain: filter.domain,
      is_open: filter.is_open,
      skills: filter.skills,
      degrees: filter.degrees
    };
    return this.http.post(this.baseUrl + 'jobapplications/filter', body);
  }

  addJobApplication(
    job_application: JobApplicationRequestModel
  ): Observable<any> {
    return this.http.post(this.baseUrl + 'jobapplications', job_application);
  }

  deleteJobApplication(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'jobapplications/', {
      body: { application_id: id }
    });
  }

  updateJobApplication(
    application_id: number,
    response: JobApplicationUpdateRequestModel
  ): Observable<any> {
    return this.http.put(
      this.baseUrl + 'jobapplications/' + application_id,
      response
    );
  }

  getJobApplicationsByProfileId(profile_id: number): Observable<any> {
    return this.http.get(
      this.baseUrl + 'jobapplications/' + profile_id.toString()
    );
  }

  getJobDetails(id: number, profile_id: number): Observable<any> {
    return this.http.get(
      this.baseUrl +
        'job_details/' +
        id.toString() +
        '?profile_id=' +
        profile_id.toString()
    );
  }
}
