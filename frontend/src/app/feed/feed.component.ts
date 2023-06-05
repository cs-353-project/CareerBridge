import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatePostDialogComponent } from './create-post-dialog/create-post-dialog.component';
import { AuthenticationService } from '../_services/authentication.service';
import { UserAuthResponseModel } from '../_models/user_models';
import { PostService } from '../_services/post.service';
import { CommentRequestModel } from '../_models/post_models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../_services/profile.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public user: UserAuthResponseModel =
    this.authenticationService.getCurrentUser();

  comment_index = -1;

  posts: any[];

  constructor(
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private postService: PostService,
    private userService: ProfileService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.posts = [];
    this.postService
      .getAllPosts()
      .toPromise()
      .then(response => {
        response.forEach(post => {
          console.log(post);
          let postObj = {
            post_id: post.post_id,
            user_id: post.user_id,
            title: post.title,
            content: post.content,
            attachment: post.attachment,
            post_date: post.post_date,
            comments: post.comments,
            new_comment: '',
            user: post.user[0]
          };
          this.posts.unshift(postObj);
        });
      });
  }

  createPost() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      user_id: this.user.user.user_id,
      content: '',
      title: '',
      attachment: '',
      post_date: ''
    };
    const dialogRef = this.dialog.open(CreatePostDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        window.location.reload();
      }
    });
  }

  addComment(post: any) {
    if (post.new_comment.trim() == '') {
      return;
    }
    let date = new Date();
    let request: CommentRequestModel = {
      user_id: this.user.user.user_id,
      post_id: post.post_id,
      content: post.new_comment,
      commented_at: date.toISOString().split('T')[0]
    };
    this.postService.addComment(request).subscribe(
      response => {
        post.new_comment = '';
        request['user'] = this.user.user;
        post.comments.push(request);
        this.toastr.success('Comment added successfully', 'Success');
        this.comment_index = -1;
      },
      error => {
        this.toastr.error('Comment could not be added', 'Error');
      }
    );
  }

  toggleComment(index: number) {
    if (index == this.comment_index) {
      this.comment_index = -1;
    } else {
      this.comment_index = index;
    }
  }
}
