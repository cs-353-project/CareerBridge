import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationModel } from '../_models/notification_models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllNotifications(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'notifications/' + id);
  }
}
