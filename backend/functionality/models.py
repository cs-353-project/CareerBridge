from typing import Optional

from pydantic import BaseModel, HttpUrl


class AssessSkillRequestModel(BaseModel):
    """Assess a skill request model.

    Args:
        BaseModel (BaseModel): The base model.
    """

    skill_id: int
    assessor_user_id: int
    assessor_profile_id: int
    rating: int


class AssessSkillResponseModel(BaseModel):
    skill_id: int
    assessor_user_id: int
    rating: int
