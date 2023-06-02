export interface ProfileResponseModel {
  profile_id: number;
  user_id: number;
  avatar: string;
  country: string;
  external_portfolio_url: string;
  address: string;
  biography: string;
  is_private: boolean;
  resume: string;
  phone_number: string;
  is_application_specific: boolean;
  created_at: string;
}

export interface ProfileUpdateRequestModel {
  avatar?: string;
  country?: string;
  external_portfolio_url?: string;
  address?: string;
  biography?: string;
  is_private?: boolean;
  resume?: string;
  phone_number?: string;
  is_application_specific?: boolean;
}

export interface ExperienceResponseModel {
  experience_id: number;
  profile_id: number;
  title: string;
  start_date: string;
  end_date: string;
  description: string;
  current_status: string;
}

export interface ExperienceRequestModel {
  profile_id: number;
  title: string;
  start_date: string;
  end_date: string;
  description: string;
  current_status: string;
}

export interface DegreeResponseModel {
  degree_id: number;
  name: string;
}

export interface DegreeRequestModel {
  name: string;
}

export interface EducationalExperienceResponseModel {
  experience: ExperienceResponseModel;
  grade: string;
  field_of_study: string;
  school_name: string;
  degree: DegreeResponseModel;
}

export interface EducationalExperienceRequestModel {
  experience: ExperienceRequestModel;
  grade: string;
  field_of_study: string;
  school_name: string;
  degree: DegreeRequestModel;
}

export interface WorkExperienceResponseModel {
  experience: ExperienceResponseModel;
  company_name: string;
  setting: string;
  type: string;
}

export interface WorkExperienceRequestModel {
  experience: ExperienceRequestModel;
  company_name: string;
  setting: string;
  type: string;
}

export interface VoluntaryExperienceResponseModel {
  experience: ExperienceResponseModel;
  responsibility: string;
  organization_name: string;
}

export interface VoluntaryExperienceRequestModel {
  experience: ExperienceRequestModel;
  responsibility: string;
  organization_name: string;
}

export interface TestScoreResponseModel {
  test_score_id: number;
  profile_id: number;
  test_name: string;
  description: string;
  test_date: string;
  score: string;
  attachment?: string;
}

export interface TestScoreRequestModel {
  profile_id: number;
  test_name: string;
  description: string;
  test_date: string;
  score: string;
  attachment?: string;
}

export interface PublicationResponseModel {
  publication_id: number;
  profile_id: number;
  title: string;
  description: string;
  publication_date: string;
  publisher: string;
  publication_url: string;
}

export interface PublicationRequestModel {
  profile_id: number;
  title: string;
  description: string;
  publication_date: string;
  publisher: string;
  publication_url: string;
}

export interface ProjectResponseModel {
  project_id: number;
  profile_id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  project_url: string;
}

export interface ProjectRequestModel {
  profile_id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  project_url: string;
}

export interface AwardResponseModel {
  award_id: number;
  profile_id: number;
  title: string;
  description: string;
  issuer: string;
  issue_date: string;
}

export interface AwardRequestModel {
  profile_id: number;
  title: string;
  description: string;
  issuer: string;
  issue_date: string;
}

export interface LanguageProficiencyResponseModel {
  language_id: number;
  profile_id: number;
  language_name: string;
  proficiency: string;
}

export interface LanguageProficiencyRequestModel {
  profile_id: number;
  language_name: string;
  proficiency: string;
}

export interface CertificationResponseModel {
  certification_id: number;
  profile_id: number;
  certification_name: string;
  description: string;
  credential_url: string;
  issue_date: string;
  issuer: string;
  expiration_date: string;
}

export interface CertificationRequestModel {
  profile_id: number;
  certification_name: string;
  description: string;
  credential_url: string;
  issue_date: string;
  issuer: string;
  expiration_date: string;
}

export interface SkillResponseModel {
  skill_id: number;
  profile_id: number;
  name: string;
  is_verified: boolean;
  is_master_skill: boolean;
}

export interface SkillRequestModel {
  profile_id: number;
  name: string;
  is_verified: boolean;
  is_master_skill: boolean;
}
