import datetime
from fastapi import HTTPException

from database.query import query_get, query_put, query_update

from .models import( PostResponseModel,
                     PostRequestModel,
                     CommentRequestModel,
                     CommentResponseModel)

def add_post(post_request: PostRequestModel):

    post_id = query_put(
        """
            INSERT INTO Post (user_id, content, attachment, post_date)
            VALUES (%s, %s, %s, %s)
        """,
        (
            post_request.user_id,
            post_request.content,
            post_request.attachment,
            post_request.post_date,
        ),
    )

    #Construct Response Model   
    response: PostResponseModel = PostResponseModel(
        post_id=post_id,
        user_id=post_request.user_id,
        content=post_request.content,
        attachment=post_request.attachment,
        post_date=post_request.post_date,
    )

    return response

def get_post_by_id(user_id: int):   
    post = query_get(
        """
            SELECT * FROM Post WHERE user_id = %s
        """,
        (user_id,),
    )
    return post

def delete_post(post_id: int):
    query_update(
        """
            DELETE FROM Post WHERE post_id = %s
        """,
        (post_id,),
    )
    return {"message": "Post deleted successfully."}

def add_comment(comment_request: CommentRequestModel):

    comment_id = query_put(
        """
            INSERT INTO Comment (user_id, post_id, content, commented_at)
            VALUES (%s, %s, %s, %s)
        """,
        (
            comment_request.user_id,
            comment_request.post_id,
            comment_request.content,
            comment_request.commented_at,
        ),
    )

    #Construct Response Model   
    response: CommentResponseModel = CommentResponseModel(
        comment_id=comment_id,
        user_id=comment_request.user_id,
        post_id=comment_request.post_id,
        content=comment_request.content,
        commented_at=comment_request.commented_at,
    )

    return response

def get_comment_by_id(post_id: int):   
    comment = query_get(
        """
            SELECT * FROM Comment WHERE post_id = %s
        """,
        (post_id,),
    )
    return comment

def delete_comment(comment_id: int):
    query_update(
        """
            DELETE FROM Comment WHERE comment_id = %s
        """,
        (comment_id,),
    )
    return {"message": "Comment deleted successfully."}
