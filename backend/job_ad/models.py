from typing import Optional

from pydantic import BaseModel, HttpUrl
from profile.models import DegreeResponseModel,DegreeRequestModel

class SkillInJobResponseModel(BaseModel):
    skill_id: int
    skill_name: str
    ad_id: int


class SkillInJobRequestModel(BaseModel):
    skill_name: str
    ad_id: int

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
    required_degrees: list[DegreeResponseModel]

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
    required_degrees: list[DegreeRequestModel]

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

  








    
