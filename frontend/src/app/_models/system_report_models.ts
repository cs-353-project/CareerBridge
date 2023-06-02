export interface TotalNumOfAdsResponseModel {
  total_num_of_users: number;
  total_num_of_ads: number;
  total_num_of_applications: number;
  total_num_of_views: number;
}

export interface NumOfUsersEachRoleResponseModel {
  roles: string[];
  num_of_users: number[];
}

export interface HighestApplicationsEachDomainResponseModel {
  domains: string[];
  organizations: string[];
  titles: string[];
  num_of_applications: number[];
}

export interface AverageSkillRatingOfEachSkillResponseModel {
  skills: string[];
  average_skill_rating: number[];
}

export interface LeastPublishedAdTypeForIntervalResponseModel {
  ad_type: string;
  num_of_ad: number;
}

export interface AverageNumberOfAdViewsForCompanyResponseModel {
  company_names: string[];
  average_number_of_ad_views: number[];
}

export interface MinimumAndMaximumPayAveragesResponseModel {
  company_names: string[];
  minimum_pay_averages: number[];
  maximum_pay_averages: number[];
}

export interface SystemReportResponseModel {
  report_id: number;
  total_num_of_ads: TotalNumOfAdsResponseModel;
  num_of_users_each_role: NumOfUsersEachRoleResponseModel;
  highest_applications_each_domain: HighestApplicationsEachDomainResponseModel;
  average_skill_rating_of_each_skill: AverageSkillRatingOfEachSkillResponseModel;
  least_published_ad_type_for_interval: LeastPublishedAdTypeForIntervalResponseModel;
  average_number_of_ad_views_for_company: AverageNumberOfAdViewsForCompanyResponseModel;
  minimum_and_maximum_pay_averages: MinimumAndMaximumPayAveragesResponseModel;
}
