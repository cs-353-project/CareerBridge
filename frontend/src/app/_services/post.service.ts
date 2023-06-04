import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentRequestModel, PostResponseModel } from '../_models/post_models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addComment(comment: CommentRequestModel): Observable<any> {
    return this.http.post(this.baseUrl + 'comment', comment);
  }

  getComments(post_id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'comment/' + post_id);
  }

  deleteComment(comment_id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'comment/', {
      body: { comment_id: comment_id }
    });
  }

  addPost(post: PostResponseModel): Observable<any> {
    return this.http.post(this.baseUrl + 'post', post);
  }

  getPosts(user_id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'post/' + user_id);
  }

  deletePost(post_id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'post/', {
      body: { post_id: post_id }
    });
  }
}
