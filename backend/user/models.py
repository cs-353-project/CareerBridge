from typing import Optional

from pydantic import BaseModel, EmailStr


# Request models are for API endpoints and Update models are for database interactions


class RegisterUpdateRequestModel(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str


class RegisterRequestModel(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str


class TokenModel(BaseModel):
    access_token: str
    refresh_token: str


class UserResponseModel(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    email: EmailStr
    user_role: str
    is_admin: bool


class UserAuthResponseModel(BaseModel):
    token: TokenModel
    user: UserResponseModel


class LogInRequestModel(BaseModel):
    email: str
    password: str


class UserUpdateRequestModel(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    user_role: Optional[str] = None
    is_admin: Optional[bool] = None
    can_approve_applications: Optional[bool] = None
