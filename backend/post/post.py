import datetime
from fastapi import HTTPException

from database.query import query_get, query_put, query_update

from .models import( PostResponseModel,
                     PostRequestModel)

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
