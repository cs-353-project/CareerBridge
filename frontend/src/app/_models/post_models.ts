export interface PostResponseModel {
  post_id?: number;
  user_id: number;
  content: string;
  attachment?: string;
  post_date: string;
}

export interface PostRequestModel {
  user_id: number;
  content: string;
  attachment?: string;
  post_date: string;
}

export interface CommentRequestModel {
  user_id: number;
  post_id: number;
  content: string;
  commented_at: string;
}

export interface CommentResponseModel {
  comment_id: number;
  user_id: number;
  post_id: number;
  content: string;
  commented_at: string;
}
