from typing import Optional

from pydantic import BaseModel, HttpUrl

class PostResponseModel(BaseModel):
    post_id: int
    user_id: int
    content: str
    attachment: bytes = None
    post_date: str

class PostRequestModel(BaseModel):
    user_id: int
    content: str
    attachment: bytes = None
    post_date: str
    