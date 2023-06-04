export interface TotalNumOfAdsModel {
  total_num_of_users: number;
  total_num_of_ads: number;
  total_num_of_applications: number;
  total_num_of_views: number;
}

export interface NumOfUsersEachRoleModel {
  roles: string[];
  num_of_users: number[];
}

export interface HighestApplicationsEachDomainModel {
  domains: string[];
  organizations: string[];
  titles: string[];
  num_of_applications: number[];
}

export interface AverageSkillRatingOfEachSkillModel {
  skills: string[];
  average_skill_rating: number[];
}

export interface LeastPublishedAdTypeForIntervalModel {
  ad_type: string;
  num_of_ad: number;
}

export interface AverageNumberOfAdViewsForCompanyModel {
  company_names: string[];
  average_number_of_ad_views: number[];
}

export interface MinimumAndMaximumPayAveragesModel {
  company_names: string[];
  minimum_pay_averages: number[];
  maximum_pay_averages: number[];
}

export interface SystemReportResponseModel {
  report_id: number;
  total_num_of_ads: TotalNumOfAdsModel;
  num_of_users_each_role: NumOfUsersEachRoleModel;
  // highest_applications_each_domain: HighestApplicationsEachDomainModel;
  average_skill_rating_of_each_skill: AverageSkillRatingOfEachSkillModel;
  // least_published_ad_type_for_interval: LeastPublishedAdTypeForIntervalModel;
  average_number_of_ad_views_for_company: AverageNumberOfAdViewsForCompanyModel;
  minimum_and_maximum_pay_averages: MinimumAndMaximumPayAveragesModel;
}

export interface SystemReportRequestModel {
  start_date: Date;
  end_date: Date;
}
