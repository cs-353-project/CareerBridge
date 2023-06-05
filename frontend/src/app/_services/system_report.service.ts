import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemReportRequestModel } from '../_models/system_report_models';

@Injectable({
  providedIn: 'root'
})
export class SystemReportService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSystemReports(): Observable<any> {
    return this.http.get(this.baseUrl + 'systemreports');
  }

}
