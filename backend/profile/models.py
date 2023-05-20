from typing import Optional

from pydantic import BaseModel, HttpUrl


class ProfileResponseModel(BaseModel):
    profile_id: int
    user_id: int
    avatar: bytes
    country: str
    external_portfolio_url: HttpUrl
    address: str
    biography: str
    is_private: bool
    resume: bytes
    phone_number: str
    is_application_specific: bool
    created_at: str


class ProfileUpdateRequestModel(BaseModel):
    avatar: Optional[bytes] = None
    country: Optional[str] = None
    external_portfolio_url: Optional[HttpUrl] = None
    address: Optional[str] = None
    biography: Optional[str] = None
    is_private: Optional[bool] = None
    resume: Optional[bytes] = None
    phone_number: Optional[str] = None
    is_application_specific: Optional[bool] = None
