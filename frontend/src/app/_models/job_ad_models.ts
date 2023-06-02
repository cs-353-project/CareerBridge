import { DegreeModel } from './profile_models';

export interface SkillInJobModel {
  skill_id?: number;
  skill_name: string;
  ad_id: number;
}

export interface JobAdvertisementModel {
  ad_id?: number;
  creator_id: number;
  title: string;
  description: string;
  organization: string;
  setting: string;
  location: string;
  type: string;
  pay_range_min: number;
  pay_range_max: number;
  domain: string;
  is_open: boolean;
  external_url: string;
  application_count?: number;
  view_count?: number;
  created_at?: string;
  skills: SkillInJobModel[];
  required_degrees: DegreeModel[];
}

export interface JobApplicationModel {
  application_id?: number;
  profile_id: number;
  ad_id: number;
  apply_date?: string;
  resume?: string;
  response_date?: string;
  response: string;
  cv?: string;
}

export interface JobApplicationUpdateRequestModel {
  response?: string;
}
