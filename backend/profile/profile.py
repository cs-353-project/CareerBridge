from fastapi import HTTPException

from database.query import query_get, query_put, query_update
from user.user import get_user_by_id

from .models import (
    DegreeResponseModel,
    EducationalExperienceRequestModel,
    EducationalExperienceResponseModel,
    ExperienceResponseModel,
    ProfileUpdateRequestModel,
    VoluntaryExperienceRequestModel,
    VoluntaryExperienceResponseModel,
    WorkExperienceRequestModel,
    WorkExperienceResponseModel,
)


def update_profile_base(profile_model: ProfileUpdateRequestModel, profile_id: int):
    prev_profile = get_profile_by_user_id(profile_id)[0]

    query_update(
        """
            UPDATE Profile
                SET avatar = %s,
                    country = %s,
                    external_portfolio_url = %s,
                    address = %s,
                    biography = %s,
                    is_private = %s,
                    resume = %s,
                    phone_number = %s,
                    is_application_specific = %s
                WHERE profile_id = %s;
        """,
        (
            profile_model.avatar if profile_model.avatar is not None else prev_profile["avatar"],
            profile_model.country if profile_model.country is not None else prev_profile["country"],
            profile_model.external_portfolio_url
            if profile_model.external_portfolio_url is not None
            else prev_profile["external_portfolio_url"],
            profile_model.address if profile_model.address is not None else prev_profile["address"],
            profile_model.biography if profile_model.biography is not None else prev_profile["biography"],
            profile_model.is_private if profile_model.is_private is not None else prev_profile["is_private"],
            profile_model.resume if profile_model.resume is not None else prev_profile["resume"],
            profile_model.phone_number if profile_model.phone_number is not None else prev_profile["phone_number"],
            profile_model.is_application_specific
            if profile_model.is_application_specific is not None
            else prev_profile["is_application_specific"],
            profile_id,
        ),
    )

    profile = get_profile_by_profile_id(profile_id)

    return profile


def create_profile(user_id: int):
    # Probably don't need this
    # user = get_user_by_id(user_id)

    # if len(user) == 0:
    #     raise HTTPException(status_code=404, detail="User not found")

    query_put(
        """
            INSERT INTO Profile (user_id, is_private, is_application_specific) VALUES (%s, FALSE, FALSE);
            """,
        (user_id),
    )


def add_educational_experience(ed_exp: EducationalExperienceRequestModel):
    # Create the experience first
    experience_id = query_put(
        """
            INSERT INTO
            Experience (profile_id, title, start_date, end_date, description, current_status)
            VALUES (%s, %s, %s, %s, %s, %s);
            """,
        (
            ed_exp.experience.profile_id,
            ed_exp.experience.title,
            ed_exp.experience.start_date,
            ed_exp.experience.end_date,
            ed_exp.experience.description,
            ed_exp.experience.current_status,
        ),
    )

    # Create the degree
    degree_id = query_put(
        """
            INSERT INTO Degree (name) VALUES (%s);
            """,
        (ed_exp.degree.name),
    )

    # Create the relationship
    query_put(
        """
            INSERT INTO
            EducationalExperience (experience_id, degree_id, grade, field_of_study, school_name)
            VALUES (%s, %s, %s, %s, %s);
            """,
        (
            experience_id,
            degree_id,
            ed_exp.grade,
            ed_exp.field_of_study,
            ed_exp.school_name,
        ),
    )

    degree_response: DegreeResponseModel = DegreeResponseModel(
        degree_id=degree_id,
        name=ed_exp.degree.name,
    )

    # Construct the response
    response: EducationalExperienceResponseModel = EducationalExperienceResponseModel(
        experience=ExperienceResponseModel(
            experience_id=experience_id,
            profile_id=ed_exp.experience.profile_id,
            title=ed_exp.experience.title,
            start_date=ed_exp.experience.start_date,
            end_date=ed_exp.experience.end_date,
            description=ed_exp.experience.description,
            current_status=ed_exp.experience.current_status,
        ),
        degree=degree_response,
        grade=ed_exp.grade,
        field_of_study=ed_exp.field_of_study,
        school_name=ed_exp.school_name,
    )

    return response


def add_work_experience(work_exp: WorkExperienceRequestModel):
    # Create the experience first
    experience_id = query_put(
        """
            INSERT INTO
            Experience (profile_id, title, start_date, end_date, description, current_status)
            VALUES (%s, %s, %s, %s, %s, %s);
            """,
        (
            work_exp.experience.profile_id,
            work_exp.experience.title,
            work_exp.experience.start_date,
            work_exp.experience.end_date,
            work_exp.experience.description,
            work_exp.experience.current_status,
        ),
    )

    # Create the relationship
    query_put(
        """
            INSERT INTO
            WorkExperience (experience_id, company_name, setting, type)
            VALUES (%s, %s, %s, %s);
            """,
        (
            experience_id,
            work_exp.company_name,
            work_exp.setting,
            work_exp.type,
        ),
    )

    # Construct the response
    response: WorkExperienceResponseModel = WorkExperienceResponseModel(
        experience=ExperienceResponseModel(
            experience_id=experience_id,
            profile_id=work_exp.experience.profile_id,
            title=work_exp.experience.title,
            start_date=work_exp.experience.start_date,
            end_date=work_exp.experience.end_date,
            description=work_exp.experience.description,
            current_status=work_exp.experience.current_status,
        ),
        company_name=work_exp.company_name,
        setting=work_exp.setting,
        type=work_exp.type,
    )

    return response


def add_voluntary_experience(vol_exp: VoluntaryExperienceRequestModel):
    # Create the experience first
    experience_id = query_put(
        """
            INSERT INTO
            Experience (profile_id, title, start_date, end_date, description, current_status)
            VALUES (%s, %s, %s, %s, %s, %s);
            """,
        (
            vol_exp.experience.profile_id,
            vol_exp.experience.title,
            vol_exp.experience.start_date,
            vol_exp.experience.end_date,
            vol_exp.experience.description,
            vol_exp.experience.current_status,
        ),
    )

    # Create the relationship
    query_put(
        """
            INSERT INTO
            VoluntaryExperience (experience_id, organization_name, responsibility)
            VALUES (%s, %s, %s);
            """,
        (experience_id, vol_exp.organization_name, vol_exp.responsibility),
    )

    # Construct the response
    response: VoluntaryExperienceResponseModel = VoluntaryExperienceResponseModel(
        experience=ExperienceResponseModel(
            experience_id=experience_id,
            profile_id=vol_exp.experience.profile_id,
            title=vol_exp.experience.title,
            start_date=vol_exp.experience.start_date,
            end_date=vol_exp.experience.end_date,
            description=vol_exp.experience.description,
            current_status=vol_exp.experience.current_status,
        ),
        organization_name=vol_exp.organization_name,
        responsibility=vol_exp.responsibility,
    )

    return response


def delete_experience(experience_id: int):
    # See if the experience exists
    experience = query_get(
        """
            SELECT * FROM Experience WHERE experience_id = %s;
            """,
        (experience_id),
    )

    if len(experience) == 0:
        raise HTTPException(status_code=404, detail="Experience not found")

    return query_put(
        """
            DELETE FROM Experience WHERE experience_id = %s;
            """,
        (experience_id),
    )


def get_edu_exp_by_profile_id(profile_id: int):
    edu_exp = query_get(
        """
            SELECT * FROM EducationalExperience WHERE experience_id IN (
                SELECT experience_id FROM Experience WHERE profile_id = %s
            );
            """,
        (profile_id),
    )

    return edu_exp


def get_work_exp_by_profile_id(profile_id: int):
    work_exp = query_get(
        """
            SELECT * FROM WorkExperience WHERE experience_id IN (
                SELECT experience_id FROM Experience WHERE profile_id = %s
            );
            """,
        (profile_id),
    )

    return work_exp


def get_vol_exp_by_profile_id(profile_id: int):
    vol_exp = query_get(
        """
            SELECT * FROM VoluntaryExperience WHERE experience_id IN (
                SELECT experience_id FROM Experience WHERE profile_id = %s
            );
            """,
        (profile_id),
    )

    return vol_exp


def get_profile_by_user_id(user_id: int):
    profile = query_get(
        """
            SELECT * FROM Profile WHERE user_id = %s;
            """,
        (user_id),
    )

    return profile


def get_profile_by_user_id_main(user_id: int):
    profile = query_get(
        """
            SELECT * FROM Profile WHERE user_id = %s AND is_application_specific = FALSE;
            """,
        (user_id),
    )

    return profile


def get_profile_by_profile_id(profile_id: int):
    profile = query_get(
        """
            SELECT * FROM Profile WHERE profile_id = %s;
            """,
        (profile_id),
    )

    return profile
