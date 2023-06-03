import profile.profile

from fastapi import HTTPException

from database.query import query_get, query_put, query_update

from .auth import Auth
from .models import RegisterUpdateRequestModel, UserUpdateRequestModel


auth_handler = Auth()


def register_user(user_model: RegisterUpdateRequestModel):
    user = get_user_by_email(user_model.email)
    if len(user) != 0:
        raise HTTPException(status_code=409, detail="Email user already exist.")
    query_put(
        """
                INSERT INTO User (
                    first_name,
                    last_name,
                    email,
                    password
                ) VALUES (%s,%s,%s,%s)
                """,
        (user_model.first_name, user_model.last_name, user_model.email, user_model.password),
    )

    user = get_user_by_email_hide_password(user_model.email)

    # Normally, this part should be done by a trigger in the database, but somehow it gives a syntax error
    # when I try to create the trigger
    query_put(
        """
            INSERT INTO AppUser (user_id, user_role) VALUES ( %s, 'Professional')
        """,
        (user[0]["user_id"]),
    )

    # Also create a profile for the user
    profile.create_profile(user[0]["user_id"])

    user = get_user_by_email_hide_password(user_model.email)

    return user[0]


def login_user(email, password):
    user = get_user_by_email(email)
    if len(user) == 0:
        print("Invalid email")
        raise HTTPException(status_code=401, detail="Invalid email")
    if not password == user[0]["password"]:
        print("Invalid password")
        raise HTTPException(status_code=401, detail="Invalid password")

    user = get_user_by_email_hide_password(email)

    return user[0]


def update_user(user_model: UserUpdateRequestModel, user_id: int):
    prev_user = get_user_by_id(user_id)[0]

    query_put(
        """
            UPDATE User
                SET first_name = %s,
                    last_name = %s,
                    email = %s,
                    password = %s
                WHERE user_id = %s;
            """,
        (
            user_model.first_name if user_model.first_name is not None else prev_user["first_name"],
            user_model.last_name if user_model.last_name is not None else prev_user["last_name"],
            user_model.email if user_model.email is not None else prev_user["email"],
            user_model.password if user_model.password is not None else prev_user["password"],
            user_id,
        ),
    )

    if user_model.user_role is not None:
        query_put(
            """
                UPDATE AppUser
                    SET user_role = %s
                    WHERE user_id = %s;
                """,
            (user_model.user_role, user_id),
        )

    if user_model.is_admin is not None:
        if user_model.is_admin:
            query_put(
                """
                    INSERT IGNORE INTO Admin (user_id, can_approve_applications) VALUES (%s, 0);
                    """,
                (user_id),
            )
        else:
            query_put(
                """
                    DELETE FROM Admin WHERE user_id = %s;
                    """,
                (user_id),
            )

        if user_model.can_approve_applications is not None:
            query_put(
                """
                    UPDATE Admin
                        SET can_approve_applications = %s
                        WHERE user_id = %s;
                    """,
                (user_model.can_approve_applications, user_id),
            )

    user = get_user_by_id(user_id)

    return user[0]


def get_all_users():
    user = query_get(
        """
        SELECT user_id, first_name, last_name, email, user_role, is_admin
        FROM UserLogin u
        """,
        (),
    )
    return user


def get_user_by_email(email: str):
    user = query_get(
        """
        SELECT *
        FROM UserLogin u
        WHERE u.email = %s
        """,
        (email),
    )
    return user


def get_user_by_email_hide_password(email: str):
    user = query_get(
        """
        SELECT user_id, first_name, last_name, email, user_role, is_admin
        FROM UserLogin u
        WHERE u.email = %s
        """,
        (email),
    )
    return user


def get_user_by_id(id: int):
    user = query_get(
        """
        SELECT *
        FROM UserLogin u
        WHERE u.user_id = %s
        """,
        (id),
    )
    return user
