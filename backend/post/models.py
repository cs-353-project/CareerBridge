from typing import Optional

from pydantic import BaseModel, HttpUrl


class PostResponseModel(BaseModel):
    post_id: int
    user_id: int
    title: str
    content: str
    attachment: bytes = None
    post_date: str


class PostRequestModel(BaseModel):
    user_id: int
    title: str
    content: str
    attachment: bytes = None
    post_date: str


class CommentRequestModel(BaseModel):
    user_id: int
    post_id: int
    content: str
    commented_at: str


class CommentResponseModel(BaseModel):
    comment_id: int
    user_id: int
    post_id: int
    content: str
    commented_at: str
