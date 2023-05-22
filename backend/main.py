from profile.models import (
    EducationalExperienceRequestModel,
    EducationalExperienceResponseModel,
    ProfileResponseModel,
    ProfileUpdateRequestModel,
    VoluntaryExperienceRequestModel,
    VoluntaryExperienceResponseModel,
    WorkExperienceRequestModel,
    WorkExperienceResponseModel,
    TestScoreRequestModel,
    TestScoreResponseModel,
    PublicationResponseModel,
    PublicationRequestModel,
    CertificationResponseModel,
    CertificationRequestModel
)
from profile.profile import (
    add_educational_experience,
    add_voluntary_experience,
    add_work_experience,
    delete_experience,
    get_edu_exp_by_profile_id,
    get_profile_by_user_id_main,
    get_vol_exp_by_profile_id,
    get_work_exp_by_profile_id,
    update_profile_base,
    add_test_score,
    get_test_score_by_profile_id,
    delete_test_score,
    add_publication,
    get_publication_by_profile_id,
    delete_publication,
    add_certification,
    get_certification_by_profile_id,
    delete_certification,
)

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


@app.post("/api/profile/educational-experience", response_model=EducationalExperienceResponseModel)
def add_educational_experience_api(educational_experience_details: EducationalExperienceRequestModel):
    """
    This educational experience add API allow you to add educational experience data.
    """
    educational_experience = add_educational_experience(educational_experience_details)

    # if len(educational_experience) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding educational experience")

    return JSONResponse(status_code=200, content=jsonable_encoder(educational_experience))


@app.delete("/api/profile/experience")
def delete_experience_api(experience_id: int):
    """
    This experience delete API allow you to delete experience data.
    """
    delete_experience(experience_id)

    return JSONResponse(status_code=200, content={"message": "Experience deleted successfully"})

@app.delete("/api/profile/test-score")
def delete_test_score_api(test_score_id: int):
    """
    This test score delete API allow you to delete test score data.
    """
    delete_test_score(test_score_id)

    return JSONResponse(status_code=200, content={"message": "Test score deleted successfully"})

@app.delete("/api/profile/publication")
def delete_publication_api(publication_id: int):
    """
    This publication delete API allow you to delete publication data.
    """
    delete_publication(publication_id)

    return JSONResponse(status_code=200, content={"message": "Publication deleted successfully"})

@app.delete("/api/profile/certification")
def delete_certification_api(certification_id: int):
    """
    This certification delete API allow you to delete certification data.
    """
    delete_certification(certification_id)

    return JSONResponse(status_code=200, content={"message": "Certification deleted successfully"})

@app.post("/api/profile/work-experience", response_model=WorkExperienceResponseModel)
def add_work_experience_api(work_experience_details: WorkExperienceRequestModel):
    """
    This work experience add API allow you to add work experience data.
    """
    work_experience = add_work_experience(work_experience_details)

    # if len(work_experience) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding work experience")

    return JSONResponse(status_code=200, content=jsonable_encoder(work_experience))


@app.post("/api/profile/voluntary-experience", response_model=VoluntaryExperienceResponseModel)
def add_voluntary_experience_api(voluntary_experience_details: VoluntaryExperienceRequestModel):
    """
    This voluntary experience add API allow you to add voluntary experience data.
    """
    voluntary_experience = add_voluntary_experience(voluntary_experience_details)

    # if len(voluntary_experience) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding voluntary experience")

    return JSONResponse(status_code=200, content=jsonable_encoder(voluntary_experience))


@app.get("/api/profile/educational-experience/{profile_id}", response_model=list[EducationalExperienceResponseModel])
def get_educational_experience_api(profile_id: int):
    """
    This educational experience API allow you to fetch specific educational experience data.
    """
    educational_experience = get_edu_exp_by_profile_id(profile_id)

    if len(educational_experience) == 0:
        raise HTTPException(status_code=404, detail="Educational experience not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(educational_experience))


@app.get("/api/profile/work-experience/{profile_id}", response_model=list[WorkExperienceResponseModel])
def get_work_experience_api(profile_id: int):
    """
    This work experience API allow you to fetch specific work experience data.
    """
    work_experience = get_work_exp_by_profile_id(profile_id)

    if len(work_experience) == 0:
        raise HTTPException(status_code=404, detail="Work experience not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(work_experience))


@app.get("/api/profile/voluntary-experience/{profile_id}", response_model=list[VoluntaryExperienceResponseModel])
def get_voluntary_experience_api(profile_id: int):
    """
    This voluntary experience API allow you to fetch specific voluntary experience data.
    """
    voluntary_experience = get_vol_exp_by_profile_id(profile_id)

    if len(voluntary_experience) == 0:
        raise HTTPException(status_code=404, detail="Voluntary experience not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(voluntary_experience))


@app.post("/api/profile/test-score", response_model=TestScoreResponseModel)
def add_test_score_api(test_score_details: TestScoreRequestModel):
    """
    This test score add API allow you to add test score data.
    """
    test_score = add_test_score(test_score_details)

    #   if len(test_score) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding test score")

    return JSONResponse(status_code=200, content=jsonable_encoder(test_score))

@app.get("/api/profile/test-score/{profile_id}", response_model=list[TestScoreResponseModel])
def get_test_score_api(profile_id: int):

    test_score = get_test_score_by_profile_id(profile_id)

    if len(test_score) == 0:
        raise HTTPException(status_code=404, detail="Test score not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(test_score))

@app.post("/api/profile/publication", response_model=PublicationResponseModel)
def add_publication_api(publication_details: PublicationRequestModel):
    """
    This publication add API allow you to add publication data.
    """
    publication = add_publication(publication_details)

    # if len(publication) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding publication")

    return JSONResponse(status_code=200, content=jsonable_encoder(publication))

@app.post("/api/profile/certification", response_model=CertificationResponseModel)
def add_certification_api(certification_details: CertificationRequestModel):
    """
    This certification add API allow you to add certification data.
    """
    certification = add_certification(certification_details)

    # if len(certification) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding certification")

    return JSONResponse(status_code=200, content=jsonable_encoder(certification))

@app.get("/api/profile/publication/{profile_id}", response_model=list[PublicationResponseModel])
def get_publication_api(profile_id: int):

    publication = get_publication_by_profile_id(profile_id)

    if len(publication) == 0:
        raise HTTPException(status_code=404, detail="Publication not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(publication))

@app.get("/api/profile/certification/{profile_id}", response_model=list[CertificationResponseModel])
def get_certification_api(profile_id: int):
    
        certification = get_certification_by_profile_id(profile_id)
    
        if len(certification) == 0:
            raise HTTPException(status_code=404, detail="Certification not found")
    
        return JSONResponse(status_code=200, content=jsonable_encoder(certification))




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
