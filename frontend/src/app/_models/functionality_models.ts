export interface AssessSkillRequestModel {
  skill_id: number;
  assessor_user_id: number;
  assessor_profile_id: number;
  rating: number;
}

export interface AssessSkillResponseModel {
  skill_id: number;
  assessor_user_id: number;
  rating: number;
}
