from typing import Optional

from pydantic import BaseModel, EmailStr, HttpUrl


class ProfileResponseModel(BaseModel):
    profile_id: int
    user_id: int
    avatar: bytes
    country: str
    external_portfolio_url: HttpUrl
    address: str
    biography: str
    is_private: bool
    resume: bytes
    phone_number: str
    is_application_specific: bool
    created_at: str


class ProfileUpdateRequestModel(BaseModel):
    avatar: Optional[bytes] = None
    country: Optional[str] = None
    external_portfolio_url: Optional[HttpUrl] = None
    address: Optional[str] = None
    biography: Optional[str] = None
    is_private: Optional[bool] = None
    resume: Optional[bytes] = None
    phone_number: Optional[str] = None
    is_application_specific: Optional[bool] = None


class ExperienceResponseModel(BaseModel):
    experience_id: int
    profile_id: int
    title: str
    start_date: str
    end_date: str
    description: str
    current_status: str


class ExperienceRequestModel(BaseModel):
    profile_id: int
    title: str
    start_date: str
    end_date: str
    description: str
    current_status: str


class DegreeResponseModel(BaseModel):
    degree_id: int
    name: str


class DegreeRequestModel(BaseModel):
    name: str


class EducationalExperienceResponseModel(BaseModel):
    experience: ExperienceResponseModel
    grade: str
    field_of_study: str
    school_name: str
    degree: DegreeResponseModel


class EducationalExperienceRequestModel(BaseModel):
    experience: ExperienceRequestModel
    grade: str
    field_of_study: str
    school_name: str
    degree: DegreeRequestModel


class WorkExperienceResponseModel(BaseModel):
    experience: ExperienceResponseModel
    company_name: str
    setting: str
    type: str


class WorkExperienceRequestModel(BaseModel):
    experience: ExperienceRequestModel
    company_name: str
    setting: str
    type: str


class VoluntaryExperienceResponseModel(BaseModel):
    experience: ExperienceResponseModel
    responsibility: str
    organization_name: str


class VoluntaryExperienceRequestModel(BaseModel):
    experience: ExperienceRequestModel
    responsibility: str
    organization_name: str


class TestScoreResponseModel(BaseModel):
    test_score_id: int
    profile_id: int
    test_name: str
    description: str
    test_date: str
    score: str
    attachment: bytes = None


class TestScoreRequestModel(BaseModel):
    profile_id: int
    test_name: str
    description: str
    test_date: str
    score: str
    attachment: bytes = None


class PublicationResponseModel(BaseModel):
    publication_id: int
    profile_id: int
    title: str
    description: str
    publication_date: str
    publisher: str
    publication_url: str


class PublicationRequestModel(BaseModel):
    profile_id: int
    title: str
    description: str
    publication_date: str
    publisher: str
    publication_url: str


class ProjectResponseModel(BaseModel):
    project_id: int
    profile_id: int
    title: str
    description: str
    start_date: str
    end_date: str
    project_url: HttpUrl


class ProjectRequestModel(BaseModel):
    profile_id: int
    title: str
    description: str
    start_date: str
    end_date: str
    project_url: HttpUrl


class AwardResponseModel(BaseModel):
    award_id: int
    profile_id: int
    title: str
    description: str
    issuer: str
    issue_date: str


class AwardRequestModel(BaseModel):
    profile_id: int
    title: str
    description: str
    issuer: str
    issue_date: str


class LanguageProficiencyResponseModel(BaseModel):
    language_id: int
    profile_id: int
    language_name: str
    proficiency: str


class LanguageProficiencyRequestModel(BaseModel):
    profile_id: int
    language_name: str
    proficiency: str


class CertificationResponseModel(BaseModel):
    certification_id: int
    profile_id: int
    certification_name: str
    description: str
    credential_url: str
    issue_date: str
    issuer: str
    expiration_date: str


class CertificationRequestModel(BaseModel):
    profile_id: int
    certification_name: str
    description: str
    credential_url: str
    issue_date: str
    issuer: str
    expiration_date: str


class SkillResponseModel(BaseModel):
    skill_id: int
    profile_id: int
    name: str
    is_verified: bool
    is_master_skill: bool


class SkillRequestModel(BaseModel):
    profile_id: int
    name: str
    is_verified: bool
    is_master_skill: bool


class BasicInfoUpdateRequestModel(BaseModel):
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    country: Optional[str] = None
    website: Optional[HttpUrl] = None


class BioUpdateRequestModel(BaseModel):
    biography: Optional[str] = None
