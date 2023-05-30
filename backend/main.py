from profile.models import (
    AwardRequestModel,
    AwardResponseModel,
    CertificationRequestModel,
    CertificationResponseModel,
    EducationalExperienceRequestModel,
    EducationalExperienceResponseModel,
    LanguageProficiencyRequestModel,
    LanguageProficiencyResponseModel,
    ProfileResponseModel,
    ProfileUpdateRequestModel,
    ProjectRequestModel,
    ProjectResponseModel,
    PublicationRequestModel,
    PublicationResponseModel,
    SkillRequestModel,
    SkillResponseModel,
    TestScoreRequestModel,
    TestScoreResponseModel,
    VoluntaryExperienceRequestModel,
    VoluntaryExperienceResponseModel,
    WorkExperienceRequestModel,
    WorkExperienceResponseModel,
)
from profile.profile import (
    add_award,
    add_certification,
    add_educational_experience,
    add_language_proficiency,
    add_project,
    add_publication,
    add_skill,
    add_test_score,
    add_voluntary_experience,
    add_work_experience,
    delete_award,
    delete_certification,
    delete_experience,
    delete_project,
    delete_publication,
    delete_skill,
    delete_test_score,
    get_awards_by_profile_id,
    get_certification_by_profile_id,
    get_edu_exp_by_profile_id,
    get_language_proficiencies_by_profile_id,
    get_profile_by_user_id_main,
    get_projects_by_profile_id,
    get_publication_by_profile_id,
    get_skills_by_profile_id,
    get_test_score_by_profile_id,
    get_vol_exp_by_profile_id,
    get_work_exp_by_profile_id,
    update_profile_base,
)

from fastapi import FastAPI, HTTPException, Security
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from database.query import query_get, query_put, query_update
from functionality.functionality import assess_skill
from functionality.models import AssessSkillRequestModel, AssessSkillResponseModel
from job_ad.job_ad import (
    add_job_advertisement,
    delete_job_advertisement,
    get_job_advertisement_by_id,
    apply_for_a_job,
    get_applications_by_ad_id,
    delete_application,
    evaluate_application,
)
from job_ad.models import (JobAdvertisementRequestModel, 
                           JobAdvertisementResponseModel,
                           JobApplicationResponseModel,
                           JobApplicationRequestModel,
                           JobApplicationUpdateRequestModel,)
from post.models import (
    CommentRequestModel,
    CommentResponseModel,
    PostRequestModel,
    PostResponseModel,
)
from post.post import (
    add_comment,
    add_post,
    delete_comment,
    delete_post,
    get_comment_by_id,
    get_post_by_id,
)
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

    # if len(educational_experience) == 0:
    #     raise HTTPException(status_code=404, detail="Educational experience not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(educational_experience))


@app.get("/api/profile/work-experience/{profile_id}", response_model=list[WorkExperienceResponseModel])
def get_work_experience_api(profile_id: int):
    """
    This work experience API allow you to fetch specific work experience data.
    """
    work_experience = get_work_exp_by_profile_id(profile_id)

    # if len(work_experience) == 0:
    #     raise HTTPException(status_code=404, detail="Work experience not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(work_experience))


@app.get("/api/profile/voluntary-experience/{profile_id}", response_model=list[VoluntaryExperienceResponseModel])
def get_voluntary_experience_api(profile_id: int):
    """
    This voluntary experience API allow you to fetch specific voluntary experience data.
    """
    voluntary_experience = get_vol_exp_by_profile_id(profile_id)

    # if len(voluntary_experience) == 0:
    #     raise HTTPException(status_code=404, detail="Voluntary experience not found")

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

    # if len(test_score) == 0:
    #     raise HTTPException(status_code=404, detail="Test score not found")

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

    # if len(publication) == 0:
    #     raise HTTPException(status_code=404, detail="Publication not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(publication))


@app.get("/api/profile/certification/{profile_id}", response_model=list[CertificationResponseModel])
def get_certification_api(profile_id: int):

    certification = get_certification_by_profile_id(profile_id)

    # if len(certification) == 0:
    #     raise HTTPException(status_code=404, detail="Certification not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(certification))


@app.post("/api/job_ad/", response_model=JobAdvertisementResponseModel)
def add_job_ad_api(job_ad_details: JobAdvertisementRequestModel):

    job_ad = add_job_advertisement(job_ad_details)

    # if len(job_ad) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding job ad")

    return JSONResponse(status_code=200, content=jsonable_encoder(job_ad))


@app.get("/api/job_ad/{creator_id}", response_model=list[JobAdvertisementResponseModel])
def get_job_ad_api(creator_id: int):

    job_ad = get_job_advertisement_by_id(creator_id)

    if len(job_ad) == 0:
        raise HTTPException(status_code=404, detail="Job ad not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(job_ad))


@app.delete("/api/job_ad/")
def delete_job_ad_api(ad_id: int):
    """
    This certification delete API allow you to delete certification data.
    """
    delete_job_advertisement(ad_id)

    return JSONResponse(status_code=200, content={"message": "Job Advertisement deleted successfully"})


@app.post("/api/profile/project", response_model=ProjectResponseModel)
def add_project_api(project_details: ProjectRequestModel):
    """
    This project add API allow you to add project data.
    """
    project = add_project(project_details)

    # if len(project) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding project")

    return JSONResponse(status_code=200, content=jsonable_encoder(project))


@app.get("/api/profile/project/{profile_id}", response_model=list[ProjectResponseModel])
def get_project_api(profile_id: int):
    """
    This project API allow you to fetch specific project data.
    """
    project = get_projects_by_profile_id(profile_id)

    # if len(project) == 0:
    #     raise HTTPException(status_code=404, detail="Project not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(project))


@app.delete("/api/profile/project")
def delete_project_api(project_id: int):
    """
    This project delete API allow you to delete project data.
    """
    delete_project(project_id)

    return JSONResponse(status_code=200, content={"message": "Project deleted successfully"})


@app.post("/api/profile/award", response_model=AwardResponseModel)
def add_award_api(award_details: AwardRequestModel):
    """
    This award add API allow you to add award data.
    """
    award = add_award(award_details)

    # if len(award) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding award")

    return JSONResponse(status_code=200, content=jsonable_encoder(award))


@app.get("/api/profile/award/{profile_id}", response_model=list[AwardResponseModel])
def get_award_api(profile_id: int):
    """
    This award API allow you to fetch specific award data.
    """
    award = get_awards_by_profile_id(profile_id)

    # if len(award) == 0:
    #     raise HTTPException(status_code=404, detail="Award not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(award))


@app.delete("/api/profile/award")
def delete_award_api(award_id: int):
    """
    This award delete API allow you to delete award data.
    """
    delete_award(award_id)

    return JSONResponse(status_code=200, content={"message": "Award deleted successfully"})


@app.post("/api/profile/language", response_model=LanguageProficiencyRequestModel)
def add_language_proficiency_api(language_proficiency_details: LanguageProficiencyRequestModel):
    """
    This language proficiency add API allow you to add language proficiency data.
    """
    language_proficiency = add_language_proficiency(language_proficiency_details)

    # if len(language_proficiency) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding language proficiency")

    return JSONResponse(status_code=200, content=jsonable_encoder(language_proficiency))


@app.get("/api/profile/language/{profile_id}", response_model=list[LanguageProficiencyResponseModel])
def get_language_proficiency_api(profile_id: int):
    """
    This language proficiency API allow you to fetch specific language proficiency data.
    """
    language_proficiency = get_language_proficiencies_by_profile_id(profile_id)

    # if len(language_proficiency) == 0:
    #     raise HTTPException(status_code=404, detail="Language proficiency not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(language_proficiency))


@app.delete("/api/profile/language")
def delete_language_proficiency_api(language_proficiency_id: int):
    """
    This language proficiency delete API allow you to delete language proficiency data.
    """
    delete_language_proficiency_api(language_proficiency_id)

    return JSONResponse(status_code=200, content={"message": "Language proficiency deleted successfully"})


@app.post("/api/post", response_model=PostResponseModel)
def add_post_api(post_details: PostRequestModel):
    """
    This post add API allow you to add post data.
    """
    post = add_post(post_details)

    # if len(post) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding post")

    return JSONResponse(status_code=200, content=jsonable_encoder(post))


@app.get("/api/post/{user_id}", response_model=list[PostResponseModel])
def get_post_api(user_id: int):
    """
    This post API allow you to fetch specific post data.
    """
    post = get_post_by_id(user_id)

    if len(post) == 0:
        raise HTTPException(status_code=404, detail="Post not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(post))


@app.delete("/api/post")
def delete_post_api(post_id: int):
    """
    This post delete API allow you to delete post data.
    """
    delete_post(post_id)

    return JSONResponse(status_code=200, content={"message": "Post deleted successfully"})


@app.post("/api/profile/skill", response_model=SkillRequestModel)
def add_skill_api(skill_details: SkillRequestModel):
    """
    This skill add API allow you to add skill data.
    """
    skill = add_skill(skill_details)

    # if len(skill) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding skill")

    return JSONResponse(status_code=200, content=jsonable_encoder(skill))


@app.get("/api/profile/skill/{profile_id}", response_model=list[SkillResponseModel])
def get_skill_api(profile_id: int):
    """
    This skill API allow you to fetch specific skill data.
    """
    skill = get_skills_by_profile_id(profile_id)

    # if len(skill) == 0:
    #     raise HTTPException(status_code=404, detail="Skill not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(skill))


@app.delete("/api/profile/skill")
def delete_skill_api(skill_id: int):
    """
    This skill delete API allow you to delete skill data.
    """
    delete_skill(skill_id)

    return JSONResponse(status_code=200, content={"message": "Skill deleted successfully"})


@app.post("/api/post/comment", response_model=CommentRequestModel)
def add_comment_api(comment_details: CommentRequestModel):
    """
    This comment add API allow you to add comment data.
    """
    comment = add_comment(comment_details)

    # if len(comment) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding comment")

    return JSONResponse(status_code=200, content=jsonable_encoder(comment))


@app.get("/api/post/comment/{post_id}", response_model=list[CommentResponseModel])
def get_comment_api(post_id: int):
    """
    This comment API allow you to fetch specific comment data.
    """
    comment = get_comment_by_id(post_id)

    if len(comment) == 0:
        raise HTTPException(status_code=404, detail="Comment not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(comment))


@app.delete("/api/post/comment")
def delete_comment_api(comment_id: int):
    """
    This comment delete API allow you to delete comment data.
    """
    delete_comment(comment_id)

    return JSONResponse(status_code=200, content={"message": "Comment deleted successfully"})


@app.post("/api/profile/skill/assess", response_model=AssessSkillResponseModel)
def assess_skill_api(assess_skill_details: AssessSkillRequestModel):
    """
    This skill assess API allow you to assess skill data.
    """

    _as = assess_skill(assess_skill_details)

    # if len(assess_skill) == 0:
    #     raise HTTPException(status_code=404, detail="Error while assessing skill")

    return JSONResponse(status_code=200, content=jsonable_encoder(_as))

@app.post("/api/jobapplications", response_model=JobApplicationResponseModel)
def add_job_application_api(job_application_details: JobApplicationRequestModel):
    """
    This job application add API allow you to add job application data.
    """
    job_application = apply_for_a_job(job_application_details)

    # if len(job_application) == 0:
    #     raise HTTPException(status_code=404, detail="Error while adding job application")

    return JSONResponse(status_code=200, content=jsonable_encoder(job_application))

@app.get("/api/jobapplications/{ad_id}", response_model=list[JobApplicationResponseModel])
def get_job_application_api(ad_id: int):
    """
    This job application API allow you to fetch specific job application data.
    """
    job_application = get_applications_by_ad_id(ad_id)

    if len(job_application) == 0:
        raise HTTPException(status_code=404, detail="Job application not found")

    return JSONResponse(status_code=200, content=jsonable_encoder(job_application))

@app.delete("/api/jobapplications")
def delete_job_application_api(application_id: int):
    """
    This job application delete API allow you to delete job application data.
    """
    delete_application(application_id)

    return JSONResponse(status_code=200, content={"message": "Job application deleted successfully"})

@app.patch("/api/jobapplications/update", response_model=JobApplicationResponseModel)
def update_job_application_api(application_id: int, application_details: JobApplicationUpdateRequestModel):
    """
    This job application update API allow you to update job application data.
    """
    job_application = evaluate_application(application_id, application_details)

    # if len(job_application) == 0:
    #     raise HTTPException(status_code=404, detail="Error while updating job application")

    return JSONResponse(status_code=200, content=jsonable_encoder(job_application))
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
