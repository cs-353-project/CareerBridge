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


class ExperienceResponseModel(BaseModel):
    experience_id: int
    profile_id: int
    title: str
    start_date: str
    end_date: str
    description: str
    current_status: str


class ExperienceRequestModel(BaseModel):
    profile_id: int
    title: str
    start_date: str
    end_date: str
    description: str
    current_status: str


class DegreeResponseModel(BaseModel):
    degree_id: int
    name: str


class DegreeRequestModel(BaseModel):
    name: str


class EducationalExperienceResponseModel(BaseModel):
    experience: ExperienceResponseModel
    grade: str
    field_of_study: str
    school_name: str
    degree: DegreeResponseModel


class EducationalExperienceRequestModel(BaseModel):
    experience: ExperienceRequestModel
    grade: str
    field_of_study: str
    school_name: str
    degree: DegreeRequestModel


class WorkExperienceResponseModel(BaseModel):
    experience: ExperienceResponseModel
    company_name: str
    setting: str
    type: str


class WorkExperienceRequestModel(BaseModel):
    experience: ExperienceRequestModel
    company_name: str
    setting: str
    type: str


class VoluntaryExperienceResponseModel(BaseModel):
    experience: ExperienceResponseModel
    responsibility: str
    organization_name: str


class VoluntaryExperienceRequestModel(BaseModel):
    experience: ExperienceRequestModel
    responsibility: str
    organization_name: str
