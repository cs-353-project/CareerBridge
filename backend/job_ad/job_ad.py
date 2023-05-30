import datetime
from fastapi import HTTPException

from database.query import query_get, query_put, query_update

from profile.models import( DegreeResponseModel)
from profile.profile import (add_skill)

from .models import( JobAdvertisementResponseModel,
                     JobAdvertisementRequestModel,
                     SkillInJobRequestModel,
                     SkillInJobResponseModel,
                     JobApplicationRequestModel,
                     JobApplicationResponseModel,
                     JobApplicationUpdateRequestModel)

def add_job_advertisement(job_advertisement_request: JobAdvertisementRequestModel):

    ad_id = query_put(
        """
            INSERT INTO JobAdvertisement (creator_id, title, description, organization, setting, location, type, pay_range_min, pay_range_max, domain, is_open, external_url) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            job_advertisement_request.creator_id,
            job_advertisement_request.title,
            job_advertisement_request.description,
            job_advertisement_request.organization,
            job_advertisement_request.setting,
            job_advertisement_request.location,
            job_advertisement_request.type,
            job_advertisement_request.pay_range_min,
            job_advertisement_request.pay_range_max,
            job_advertisement_request.domain,
            job_advertisement_request.is_open,
            job_advertisement_request.external_url,
        ),
    )

    skill_reponse_list = []
    for skill_request in job_advertisement_request.skills:
        skill_reponse = add_skill_in_job_advertisement(skill_request)
        skill_reponse_list.append(skill_reponse)
        

    degree_response_list = []
    for degree_request in job_advertisement_request.required_degrees:
        
        degree_id = query_put(
        """
            INSERT INTO Degree (name) VALUES (%s);
            """,
        (degree_request.name),
        )

        degree_response: DegreeResponseModel = DegreeResponseModel(
        degree_id=degree_id,
        name=degree_request.name,
        )

        add_degree_in_job_advertisement(ad_id, degree_id)
        degree_response_list.append(degree_response)

    #Construct Response Model
    response: JobAdvertisementResponseModel = JobAdvertisementResponseModel(
        ad_id=ad_id,
        creator_id=job_advertisement_request.creator_id,
        title=job_advertisement_request.title,
        description=job_advertisement_request.description,
        organization=job_advertisement_request.organization,
        setting=job_advertisement_request.setting,
        location=job_advertisement_request.location,
        type=job_advertisement_request.type,
        pay_range_min=job_advertisement_request.pay_range_min,
        pay_range_max=job_advertisement_request.pay_range_max,
        domain=job_advertisement_request.domain,
        is_open=job_advertisement_request.is_open,
        external_url=job_advertisement_request.external_url,
        application_count=0,
        view_count=0,
        created_at= datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        skills=skill_reponse_list,
        required_degrees=degree_response_list,
    )

    return response

def get_job_advertisement_by_id(creator_id: int):
    job_advertisement = query_get(
        """
            SELECT * FROM JobAdvertisement WHERE creator_id = %s
        """,
        (creator_id,),
    )

    if not job_advertisement:
        raise HTTPException(status_code=404, detail="Job Advertisement not found")

    return job_advertisement

def delete_job_advertisement(ad_id: int):
    query_update(
        """
            DELETE FROM JobAdvertisement WHERE ad_id = %s
        """,
        (ad_id,),
    )

def apply_filter(
    pay_range_min: int,
    pay_range_max: int,
    type: str,
    location: str,
    setting: str,
    domain: str,
    status: bool,
    degrees: list[str],
    skills: list[str]
):
    query = """
        SELECT * FROM JobAdvertisement WHERE is_open = %s
    """
    parameters = [status]

    if pay_range_min:
        query += " AND pay_range_min >= %s"
        parameters.append(pay_range_min)
    if pay_range_max:
        query += " AND pay_range_max <= %s"
        parameters.append(pay_range_max)
    if type:
        query += " AND type = %s"
        parameters.append(type)
    if location:
        query += " AND location = %s"
        parameters.append(location)
    if setting:
        query += " AND setting = %s"
        parameters.append(setting)
    if domain:
        query += " AND domain = %s"
        parameters.append(domain)

    # Add filtering based on skill names
    if skills:
        query += " AND ("
        for i, skill in enumerate(skills):
            if i != 0:
                query += " OR"
            query += " description LIKE %s"
            parameters.append(f"%{skill}%")
        query += ")"

    # Add filtering based on degree names
    if degrees:
        query += " AND ("
        for i, degree in enumerate(degrees):
            if i != 0:
                query += " OR"
            query += " description LIKE %s"
            parameters.append(f"%{degree}%")
        query += ")"

    job_advertisements = query_get(query, tuple(parameters))

    if not job_advertisements:
        raise HTTPException(status_code=404, detail="Job Advertisement not found")

    return job_advertisements
    
   

def add_skill_in_job_advertisement(skill_in_job_request: SkillInJobRequestModel):
    skill__id = query_put(
        """
            INSERT INTO  SkillInJobAdvertisement (ad_id, skill_name) 
            VALUES (%s, %s)
        """,
        (
            skill_in_job_request.ad_id,
            skill_in_job_request.skill_name,
        ),
    )

    response: SkillInJobResponseModel = SkillInJobResponseModel(
        skill_id=skill__id,
        ad_id=skill_in_job_request.ad_id,
        skill_name=skill_in_job_request.skill_name,
    )

    return response


def add_degree_in_job_advertisement(ad_id: int, degree_id: int):
    query_put(
        """
            INSERT INTO DegreeInJobAdvertisement (ad_id, degree_id) 
            VALUES (%s, %s)
        """,
        (
            ad_id,
            degree_id,
        ),
    )

def apply_for_a_job(job_application_request: JobApplicationRequestModel):
    application_id = query_put(
        """
            INSERT INTO JobAdvertisementResponse (profile_id, ad_id, response_date, response, cv) 
            VALUES (%s, %s, %s, %s, %s)
        """,
        (
            job_application_request.profile_id,
            job_application_request.ad_id,
            job_application_request.response_date,
            job_application_request.response,
            job_application_request.cv,
        ),
    )

    response: JobApplicationResponseModel = JobApplicationResponseModel(
        application_id=application_id,
        profile_id=job_application_request.profile_id,
        ad_id=job_application_request.ad_id,
        apply_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        response_date=job_application_request.response_date,
        response=job_application_request.response,
        cv = job_application_request.cv,
    )

    return response

def get_applications_by_ad_id(ad_id: int):
    applications = query_get(
        """
            SELECT * FROM JobAdvertisementResponse WHERE ad_id = %s
        """,
        (ad_id,),
    )

    if not applications:
        raise HTTPException(status_code=404, detail="Job Application not found")

    return applications

def delete_application(application_id: int):
    query_update(
        """
            DELETE FROM JobAdvertisementResponse WHERE application_id = %s
        """,
        (application_id,),
    )

def get_application_by_application_id(application_id: int):
    application = query_get(
        """
            SELECT * FROM JobAdvertisementResponse WHERE application_id = %s
        """,
        (application_id,),
    )

    if not application:
        raise HTTPException(status_code=404, detail="Job Application not found")

    return application

def evaluate_application(application_id: int, job_application_request: JobApplicationUpdateRequestModel):
    query_update(
        """
            UPDATE JobAdvertisementResponse SET response = %s, response_date = %s WHERE application_id = %s
        """,
        (job_application_request.response, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), application_id,),
    )

    application = get_application_by_application_id(application_id)

    return application





    
