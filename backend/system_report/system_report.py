import datetime
from fastapi import HTTPException

from database.query import query_get, query_put, query_update

from .models import( TotalNumOfAdsResponseModel,
                    NumOfUsersEachRoleResponseModel,
                    HighestApplicationsEachDomainResponseModel,
                    AverageSkillRatingOfEachSkillResponseModel,
                    LeastPublishedAdTypeForIntervalResponseModel,
                    AverageNumberOfAdViewsForCompanyResponseModel,
                    MinimumAndMaximumPayAveragesResponseModel,
                    SystemReportResponseModel
                    )  

def create_total_num_of_ads_response_model():

    
    total_num_of_users = query_get(
        """
            SELECT COUNT(*) FROM User
        """,
        ()
    )

    data_in_list = query_get(
        """
        SELECT COUNT(*) AS ad_count,
            SUM(view_count) AS ad_view_count,
            SUM(application_count) AS ad_application_count
            FROM JobAdvertisement
        """,
        ()
    )
    total_num_of_ads = data_in_list[0]['ad_count']
    total_num_of_views = data_in_list[0]['ad_view_count']
    total_num_of_applications = data_in_list[0]['ad_application_count']

    response: TotalNumOfAdsResponseModel = TotalNumOfAdsResponseModel(
        total_num_of_users=total_num_of_users[0]['COUNT(*)'],
        total_num_of_ads=total_num_of_ads,
        total_num_of_applications=total_num_of_applications,
        total_num_of_views=total_num_of_views,
    )

    return response
    #return "Total Num Of Ads: " + str(total_num_of_ads) + "\nTotal Num Of Applications: " + str(total_num_of_applications) + "\nTotal Num Of Views: " + str(total_num_of_views) + "\nTotal Num Of Users: " + str(total_num_of_users[0])

def create_num_of_users_each_role_response_model():
    
    list_of_data = query_get(
        """
        SELECT user_role,
            COUNT(*) AS user_count
            FROM(
                SELECT user_role
                FROM AppUser
                UNION ALL
                SELECT
                'Admin' AS user_role
                FROM Admin
            ) AS combined_table
            GROUP BY user_role
            ORDER BY user_count DESC;
        """,
        ()
    )

    roles = []
    num_of_users = []
    for data in list_of_data:
        roles.append(data['user_role'])
        num_of_users.append(data['user_count'])

    response: NumOfUsersEachRoleResponseModel = NumOfUsersEachRoleResponseModel(
        roles=roles,
        num_of_users=num_of_users
    )

    return response
    #return "Roles: " + str(roles) + "\nNum Of Users: " + str(num_of_users)

def create_highest_applications_each_domain_response_model(start_time: datetime.datetime, end_time: datetime.datetime):

    list_of_data = query_get(
        """
            WITH domain_counts AS (
                SELECT JA.domain AS domain_name, JA.ad_id AS ad_id, COUNT(*) as application_count
                FROM JobAdvertisement JA, JobAdvertisementResponse JAR
                WHERE JA.ad_id = JAR.ad_id AND JAR.apply_date BETWEEN %s AND %s
                GROUP BY JA.domain, JA.ad_id)
            SELECT DC.domain_name, DC.ad_id, JA.title, JA.organization, DC.application_count
            FROM domain_counts DC, JobAdvertisement JA
            WHERE JA.ad_id = DC.ad_id AND DC.application_count = (
                SELECT MAX(application_count)
                FROM domain_counts)
            ORDER BY DC.application_count DESC;
        """,
        (start_time, end_time)
    )

    domains = []
    titles = []
    organizations = []
    num_of_applications = []
    for data in list_of_data:
        domains.append(data[0]['domain_name'])
        titles.append(data[0]['title'])
        organizations.append(data[0]['organization'])
        num_of_applications.append(data[0]['application_count'])

    response: HighestApplicationsEachDomainResponseModel = HighestApplicationsEachDomainResponseModel(
        domains=domains,
        titles=titles,
        organizations=organizations,
        num_of_applications=num_of_applications 
    )

    return response
    #return "Domains: " + str(domains) + "\nTitles: " + str(titles) + "\nOrganizations: " + str(organizations) + "\nNum Of Applications: " + str(num_of_applications)

def create_average_skill_rating_of_each_skill_response_model():

    list_of_data = query_get(
        """
            SELECT S.name AS skill_name, AVG(SA.rating) AS average_rating
            FROM Skill S, SkillAssessment SA
            WHERE S.skill_id = SA.skill_id
            GROUP BY S.name
            ORDER BY S.name ASC;
        """,
        ()
    )

    skill_names = []
    average_ratings = []
    for data in list_of_data:
        skill_names.append(data[0]['skill_name'])
        average_ratings.append(data[0]['average_rating'])

    response: AverageSkillRatingOfEachSkillResponseModel = AverageSkillRatingOfEachSkillResponseModel(
        skill_names=skill_names,
        average_ratings=average_ratings
    )

    return response
    #return "Skill Names: " + str(skill_names) + "\nAverage Ratings: " + str(average_ratings)

def create_least_published_ad_type_for_interval_response_model(start_time: datetime.datetime, end_time: datetime.datetime):

    list_of_data = query_get(
        """
            WITH ad_counts AS (SELECT JA.type AS ad_type, COUNT(*) as application_count
                FROM JobAdvertisement JA, JobAdvertisementResponse JAR
                WHERE JA.ad_id = JAR.ad_id
                AND JAR.apply_date BETWEEN %s AND %s
                GROUP BY JA.type)
            SELECT AC.ad_type, AC.application_count
            FROM ad_counts AC
            WHERE AC.application_count = (
                SELECT MIN(application_count)
                FROM ad_counts);
        """,
        (start_time, end_time)
    )

    if(list_of_data):
        response: LeastPublishedAdTypeForIntervalResponseModel = LeastPublishedAdTypeForIntervalResponseModel(
            ad_type= list_of_data[0]['ad_type'],
            num_of_ad= list_of_data[0]['application_count']
        )
        return response
    else:
        return "No data found"
    

def create_average_number_of_ad_views_for_company_response_model():

    list_of_data = query_get(
        """
            SELECT C.company_name, AVG(JA.view_count) AS average_view_count
            FROM Company C, JobAdvertisement JA
            WHERE C.company_name = JA.organization
            GROUP BY C.company_name
            ORDER BY C.company_name ASC;
        """,
        ()
    )

    company_names = []
    average_view_counts = []
    for data in list_of_data:
        company_names.append(data['company_names'])
        average_view_counts.append(data['average_view_count'])

    #response: AverageNumberOfAdViewsForCompanyResponseModel = AverageNumberOfAdViewsForCompanyResponseModel(
        #company_names=company_names,
        #average_number_of_ad_views=average_view_counts
    #)

    #return response
    return "Company Names: " + str(company_names) + "\nAverage Number Of Ad Views: " + str(average_view_counts)

def create_minimum_and_maximum_pay_averages_response_model():

    list_of_data = query_get(
        """
            SELECT C.company_name,AVG(JA.pay_range_min) AS average_min_pay, AVG(JA.pay_range_mix) AS average_max_pay
            FROM Company C, JobAdvertisement JA
            WHERE C.company_name = JA.organization
            GROUP BY C.company_name
            ORDER BY C.company_name ASC;
        """
    )

    company_names = []
    minimum_pay_averages = []
    maximum_pay_averages = []
    for data in list_of_data:
        company_names.append(data[0]['company_names'])
        minimum_pay_averages.append(data[0]['average_min_pay'])
        maximum_pay_averages.append(data[0]['average_max_pay'])

    response: MinimumAndMaximumPayAveragesResponseModel = MinimumAndMaximumPayAveragesResponseModel(
        company_names=company_names,
        minimum_pay_averages=minimum_pay_averages,
        maximum_pay_averages=maximum_pay_averages
    )

    return response



        
