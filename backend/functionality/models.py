from typing import Optional

from pydantic import BaseModel, HttpUrl


class AssessSkillRequestModel(BaseModel):
    skill_id: int
    assessor_user_id: int
    assessor_profile_id: int
    rating: int


class AssessSkillResponseModel(BaseModel):
    skill_id: int
    assessor_user_id: int
    rating: int
