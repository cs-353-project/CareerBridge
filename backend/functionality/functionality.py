from profile.profile import get_skills_by_profile_id

from fastapi import HTTPException

from database.query import query_get, query_put, query_update
from user.user import get_user_by_id

from .models import AssessSkillRequestModel, AssessSkillResponseModel


def assess_skill(assess_skill_request: AssessSkillRequestModel):
    """Assess a skill by its id.

    Args:
        skill_id (int): The id of the skill to assess.

    Raises:
        HTTPException: If the skill does not exist.

    Returns:
        dict: The skill data.
    """

    skill = query_get("SELECT * FROM Skill WHERE skill_id = %s", (assess_skill_request.skill_id,))

    assessor_skills = get_skills_by_profile_id(assess_skill_request.assessor_profile_id)

    get_master_skill = None

    # for s in assessor_skills:
    #     if s["is_master_skill"] == 1:
    #         get_master_skill = s
    #         break

    # if get_master_skill is None:
    #     raise HTTPException(status_code=404, detail="Master skill not found.")

    # if get_master_skill["name"] != skill[0]["name"]:
    #     raise HTTPException(status_code=404, detail="You are not allowed to assess this skill.")

    # if skill[0]["is_master_skill"] is True or skill[0]["is_verified"] is True:
    #     raise HTTPException(status_code=404, detail="The skill is already verified.")

    query_put(
        """
            INSERT INTO SkillAssessment (skill_id, assessor_id, rating)
            VALUES (%s, %s, %s)
        """,
        (assess_skill_request.skill_id, assess_skill_request.assessor_user_id, assess_skill_request.rating),
    )

    return AssessSkillResponseModel(
        skill_id=assess_skill_request.skill_id,
        assessor_user_id=assess_skill_request.assessor_user_id,
        rating=assess_skill_request.rating,
    )


def get_skill_assessment(skill_id):
    return query_get(
        """
            SELECT * FROM SkillAssessment WHERE skill_id = id
        """,
        (skill_id,)
    )
