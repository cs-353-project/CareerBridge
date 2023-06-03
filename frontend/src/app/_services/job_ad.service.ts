import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { JobAdvertisementModel } from '../_models/job_ad_models';

@Injectable({
  providedIn: 'root'
})
export class JobAdService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getJobAds(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'job-ad/' + id);
  }

  addJobAd(jobAd: JobAdvertisementModel): Observable<any> {
    return this.http.post(this.baseUrl + 'job-ad', jobAd);
  }

  deleteJobAd(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'job-ad/', { body: { ad_id: id } });
  }
}
