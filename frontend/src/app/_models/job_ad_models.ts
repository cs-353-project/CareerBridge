import {DegreeModel, ProfileModel} from './profile_models';

export interface SkillInJobResponseModel {
  skill_id?: number;
  skill_name: string;
  ad_id: number;
}

export interface SkillInJobRequestModel {
  skill_name: string;
}

export interface DegreeInJobResponseModel {
  degree_id: number;
  degree_name: string;
  ad_id: number;
}

export interface DegreeInJobRequestModel {
  degree_name: string;
}

export interface JobAdvertisementResponseModel {
  ad_id: number;
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
  application_count: number;
  view_count: number;
  created_at: string;
  skills: SkillInJobResponseModel[];
  required_degrees: DegreeModel[];
}

export interface JobAdvertisementRequestModel {
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
  skills: SkillInJobRequestModel[];
  required_degrees: DegreeInJobRequestModel[];
}

export interface JobApplicationResponseModel {
  application_id: number;
  profile_id: number;
  ad_id: number;
  apply_date: string;
  resume?: string;
  response_date?: string;
  response: string;
  cv?: string;
}

export interface JobApplicationRequestModel {
  profile_id: number;
  ad_id: number;
  resume?: string;
  response_date?: string;
  response: string;
  cv?: string;
}

export interface JobApplicationUpdateRequestModel {
  response?: string;
}

export interface JobAdFilterRequestModel {
  pay_range_min?: number;
  pay_range_max?: number;
  type?: string;
  location?: string;
  setting?: string;
  domain?: string;
  is_open?: number;
  degrees?: string[];
  skills?: string[];
}

export interface JobDetailResponseModel {
  ad_id: number;
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
  application_count: number;
  view_count: number;
  created_at: string;
  skills: SkillInJobResponseModel[];
  required_degrees: DegreeModel[];
  creator: ProfileModel;
}
