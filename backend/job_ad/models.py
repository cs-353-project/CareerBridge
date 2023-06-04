from profile.models import DegreeRequestModel, DegreeResponseModel
from typing import Optional

from pydantic import BaseModel, HttpUrl

from backend.profile import ProfileResponseModel


class SkillInJobResponseModel(BaseModel):
    skill_id: int
    skill_name: str
    ad_id: int


class SkillInJobRequestModel(BaseModel):
    skill_name: str


class DegreeInJobResponseModel(BaseModel):
    degree_id: int
    degree_name: str
    ad_id: int


class DegreeInJobRequestModel(BaseModel):
    degree_name: str


class JobAdvertisementResponseModel(BaseModel):
    ad_id: int
    creator_id: int
    title: str
    description: str
    organization: str
    setting: str
    location: str
    type: str
    pay_range_min: int
    pay_range_max: int
    domain: str
    is_open: bool
    external_url: str
    application_count: int
    view_count: int
    created_at: str
    skills: list[SkillInJobResponseModel]
    required_degrees: list[DegreeInJobResponseModel]


class JobAdvertisementRequestModel(BaseModel):
    creator_id: int
    title: str
    description: str
    organization: str
    setting: str
    location: str
    type: str
    pay_range_min: int
    pay_range_max: int
    domain: str
    is_open: bool
    external_url: str
    skills: list[SkillInJobRequestModel]
    required_degrees: list[DegreeInJobRequestModel]


class JobApplicationRequestModel(BaseModel):
    profile_id: int
    ad_id: int
    resume: bytes = None
    response_date: str = None
    response: str
    cv: bytes = None


class JobApplicationResponseModel(BaseModel):
    application_id: int
    profile_id: int
    ad_id: int
    apply_date: str
    resume: bytes = None
    response_date: str = None
    response: str
    cv: bytes = None


class JobApplicationUpdateRequestModel(BaseModel):
    response: Optional[str] = None


"""
    pay_range_min: int,
    pay_range_max: int,
    type: str,
    location: str,
    setting: str,
    domain: str,
    status: bool,
    degrees: list[str],
    skills: list[str],
):
"""


class JobAdFilterRequestModel(BaseModel):
    pay_range_min: Optional[int] = None
    pay_range_max: Optional[int] = None
    type: Optional[str] = None
    location: Optional[str] = None
    setting: Optional[str] = None
    domain: Optional[str] = None
    is_open: Optional[bool] = None
    degrees: Optional[list[str]] = None
    skills: Optional[list[str]] = None


class JobDetailsResponseModel(BaseModel):
    job_ad: JobAdvertisementResponseModel
    creator: ProfileResponseModel
