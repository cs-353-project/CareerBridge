import datetime
from typing import Optional

from pydantic import BaseModel, HttpUrl


class TotalNumOfAdsResponseModel(BaseModel):
    total_num_of_users: int
    total_num_of_ads: int
    total_num_of_applications: int
    total_num_of_views: int


class NumOfUsersEachRoleResponseModel(BaseModel):
    roles: list
    num_of_users: list


class HighestApplicationsEachDomainResponseModel(BaseModel):
    domains: list
    organizations: list
    titles: list
    num_of_applications: list


class AverageSkillRatingOfEachSkillResponseModel(BaseModel):
    skills: list
    average_skill_rating: list


class LeastPublishedAdTypeForIntervalResponseModel(BaseModel):
    ad_type: str
    num_of_ad: int


class AverageNumberOfAdViewsForCompanyResponseModel(BaseModel):
    company_names: list
    average_number_of_ad_views: list


class MinimumAndMaximumPayAveragesResponseModel(BaseModel):
    company_names: list
    minimum_pay_averages: list
    maximum_pay_averages: list


class SystemReportResponseModel(BaseModel):
    report_id: int
    total_num_of_ads: TotalNumOfAdsResponseModel
    num_of_users_each_role: NumOfUsersEachRoleResponseModel
    # highest_applications_each_domain: HighestApplicationsEachDomainResponseModel
    average_skill_rating_of_each_skill: AverageSkillRatingOfEachSkillResponseModel
    # least_published_ad_type_for_interval: LeastPublishedAdTypeForIntervalResponseModel
    average_number_of_ad_views_for_company: AverageNumberOfAdViewsForCompanyResponseModel
    minimum_and_maximum_pay_averages: MinimumAndMaximumPayAveragesResponseModel


class SystemReportRequestModel(BaseModel):
    start_time: None
    end_time: None
