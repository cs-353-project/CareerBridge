export interface PostModel {
  post_id?: number;
  user_id: number;
  content: string;
  attachment?: string;
  post_date: string;
}

export interface CommentModel {
  comment_id?: number;
  user_id: number;
  post_id: number;
  content: string;
  commented_at: string;
}
