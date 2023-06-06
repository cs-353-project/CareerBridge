export interface ProfileModel {
  profile_id: number;
  user_id: number;
  avatar: string;
  country: string;
  external_portfolio_url: string;
  address: string;
  biography: string;
  is_private: boolean;
  resume: any;
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
  resume?: any;
  phone_number?: string;
  is_application_specific?: boolean;
}

export interface ExperienceModel {
  experience_id?: number;
  profile_id: number;
  title: string;
  start_date: string;
  end_date: string;
  description: string;
  current_status: string;
}

export interface DegreeModel {
  degree_id?: number;
  name: string;
}

export interface EducationalExperienceModel {
  experience: ExperienceModel;
  grade: string;
  field_of_study: string;
  school_name: string;
  degree: DegreeModel;
}

export interface WorkExperienceModel {
  experience: ExperienceModel;
  company_name: string;
  setting: string;
  type: string;
}

export interface VoluntaryExperienceModel {
  experience: ExperienceModel;
  responsibility: string;
  organization_name: string;
}

export interface TestScoreModel {
  test_score_id?: number;
  profile_id: number;
  test_name: string;
  description: string;
  test_date: string;
  score: string;
  attachment?: string;
}

export interface PublicationModel {
  publication_id?: number;
  profile_id: number;
  title: string;
  description: string;
  publication_date: string;
  publisher: string;
  publication_url: string;
}

export interface ProjectModel {
  project_id?: number;
  profile_id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  project_url: string;
}

export interface AwardModel {
  award_id?: number;
  profile_id: number;
  title: string;
  description: string;
  issuer: string;
  issue_date: string;
}

export interface LanguageProficiencyModel {
  language_id?: number;
  profile_id: number;
  language_name: string;
  proficiency: string;
}

export interface CertificationModel {
  certification_id?: number;
  profile_id: number;
  certification_name: string;
  description: string;
  credential_url: string;
  issue_date: string;
  issuer: string;
  expiration_date: string;
}

export interface SkillModel {
  rating: string;
  skill_id?: number;
  profile_id: number;
  name: string;
  is_verified: boolean;
  is_master_skill: boolean;
}
