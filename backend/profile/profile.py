from fastapi import HTTPException

from database.query import query_get, query_put, query_update
from user.user import get_user_by_id

from .models import ProfileUpdateRequestModel


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
