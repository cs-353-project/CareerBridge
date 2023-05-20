from profile.models import ProfileResponseModel, ProfileUpdateRequestModel
from profile.profile import get_profile_by_user_id_main, update_profile_base

from fastapi import FastAPI, HTTPException, Security
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from database.query import query_get, query_put, query_update
from user import (
    Auth,
    LogInRequestModel,
    RegisterRequestModel,
    UserAuthResponseModel,
    UserResponseModel,
    UserUpdateRequestModel,
    get_all_users,
    get_user_by_id,
    login_user,
    register_user,
    update_user,
)


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:4000",
    "http://localhost:19006",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()
auth_handler = Auth()

# Authentication Endpoints


@app.post("/api/auth/register", response_model=UserAuthResponseModel)
def register_api(user_details: RegisterRequestModel):
    """
    This sign-up API allow you to register your account, and return access token.
    """
    user = register_user(user_details)
    access_token = auth_handler.encode_token(user_details.email)
    refresh_token = auth_handler.encode_refresh_token(user_details.email)
    return JSONResponse(
        status_code=200, content={"token": {"access_token": access_token, "refresh_token": refresh_token}, "user": user}
    )


@app.post("/api/auth/login", response_model=UserAuthResponseModel)
def login_api(user_details: LogInRequestModel):
    """
    This sign-in API allow you to obtain your access token.
    """
    user = login_user(user_details.email, user_details.password)
    access_token = auth_handler.encode_token(user["email"])
    refresh_token = auth_handler.encode_refresh_token(user["email"])
    return JSONResponse(
        status_code=200, content={"token": {"access_token": access_token, "refresh_token": refresh_token}, "user": user}
    )


@app.get("/api/auth/refresh-token")
def refresh_token_api(refresh_token: str):
    """
    This refresh-token API allow you to obtain new access token.
    """
    new_token = auth_handler.refresh_token(refresh_token)
    return {"access_token": new_token}


# User Endpoints


@app.get("/api/user/get-all-users", response_model=list[UserResponseModel])
def get_all_users_api():
    """
    This users get API allow you to fetch all user data.
    """
    users = get_all_users()
    return JSONResponse(status_code=200, content=jsonable_encoder(users))


@app.get("/api/user/{user_id}", response_model=UserResponseModel)
def get_user_by_id_api(user_id: int):
    """
    This user API allow you to fetch specific user data.
    """
    user = get_user_by_id(user_id)

    if len(user) == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(user))


@app.patch("/api/user/update", response_model=UserResponseModel)
def update_user_api(user_id: int, user_details: UserUpdateRequestModel):
    """
    This user update API allow you to update user data.
    """
    user = update_user(user_details, user_id)

    if len(user) == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(user))


# Profile Endpoints


@app.get("/api/profile/{user_id}", response_model=ProfileResponseModel)
def get_profile_main_api(user_id: int):
    """
    This profile API allow you to fetch specific profile data.
    """
    profile = get_profile_by_user_id_main(user_id)

    if len(profile) == 0:
        raise HTTPException(status_code=404, detail="Profile not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(profile))


@app.patch("/api/profile/update", response_model=ProfileResponseModel)
def update_profile_base_api(profile_id: int, profile_details: ProfileUpdateRequestModel):
    """
    This profile update API allow you to update profile data.
    """
    profile = update_profile_base(profile_details, profile_id)

    if len(profile) == 0:
        raise HTTPException(status_code=404, detail="Profile not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(profile))


# Test Endpoints


@app.get("/secret")
def secret_data_api(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    This secret API is just for testing. Need access token to access this API.
    """
    token = credentials.credentials
    if auth_handler.decode_token(token):
        return "Top Secret data only authorized users can access this info"


@app.get("/not-secret")
def not_secret_data_api():
    """
    This not-secret API is just for testing.
    """
    return "Not secret data"
