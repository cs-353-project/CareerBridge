import datetime
from profile.models import DegreeResponseModel
from profile.profile import add_skill

from fastapi import HTTPException

from database.query import query_get, query_put, query_update

from .models import (
    DegreeInJobRequestModel,
    DegreeInJobResponseModel,
    JobAdFilterRequestModel,
    JobAdvertisementRequestModel,
    JobAdvertisementResponseModel,
    JobApplicationRequestModel,
    JobApplicationResponseModel,
    JobApplicationUpdateRequestModel,
    SkillInJobRequestModel,
    SkillInJobResponseModel,
)


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
        skill_reponse = add_skill_in_job_advertisement(skill_request, ad_id)
        skill_reponse_list.append(skill_reponse)

    degree_response_list = []
    for degree_request in job_advertisement_request.required_degrees:

        degree_response = add_degree_in_job_advertisement(degree_request, ad_id)
        degree_response_list.append(degree_response)

    # Construct Response Model
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
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        skills=skill_reponse_list,
        required_degrees=degree_response_list,
    )

    return response


def get_job_advertisements():
    job_advertisement = query_get(
        """
            SELECT * FROM JobAdvertisement
        """,
        (),
    )
    if not job_advertisement:
        raise HTTPException(status_code=404, detail="Job Advertisement not found")

    for job_ad in job_advertisement:
        skill_list = query_get(
            """
                SELECT * FROM SkillInJobAdvertisement WHERE ad_id = %s
            """,
            (job_ad["ad_id"]),
        )

        degree_list = query_get(
            """
                SELECT * FROM DegreeInJobAdvertisement WHERE ad_id = %s
            """,
            (job_ad["ad_id"]),
        )

        job_ad["skills"] = skill_list
        job_ad["required_degrees"] = degree_list

    return job_advertisement


def get_job_advertisement_by_id(creator_id: int):
    job_advertisement = query_get(
        """
            SELECT * FROM JobAdvertisement WHERE creator_id = %s
        """,
        (creator_id,),
    )

    if not job_advertisement:
        raise HTTPException(status_code=404, detail="Job Advertisement not found")

    for job_ad in job_advertisement:
        skill_list = query_get(
            """
                SELECT * FROM SkillInJobAdvertisement WHERE ad_id = %s
            """,
            (job_ad["ad_id"]),
        )

        degree_list = query_get(
            """
                SELECT * FROM DegreeInJobAdvertisement WHERE ad_id = %s
            """,
            (job_ad["ad_id"]),
        )

        job_ad["skills"] = skill_list
        job_ad["required_degrees"] = degree_list

    return job_advertisement


def get_job_details(ad_id: int):
    job_advertisement = query_get(
        """
            SELECT * FROM JobAdvertisement WHERE ad_id = %s
        """,
        (ad_id,),
    )

    if not job_advertisement:
        raise HTTPException(status_code=404, detail="Job Advertisement not found")

    for job_ad in job_advertisement:
        skill_list = query_get(
            """
                SELECT * FROM SkillInJobAdvertisement WHERE ad_id = %s
            """,
            (job_ad["ad_id"]),
        )

        degree_list = query_get(
            """
                SELECT * FROM DegreeInJobAdvertisement WHERE ad_id = %s
            """,
            (job_ad["ad_id"]),
        )

        creator = query_get(
            """
                SELECT * FROM Profile WHERE user_id = %s
            """,
            (job_ad["creator_id"]),
        )

        job_ad["skills"] = skill_list
        job_ad["required_degrees"] = degree_list
        job_ad["creator"] = creator[0]

    return job_advertisement


def delete_job_advertisement(ad_id: int):
    query_update(
        """
            DELETE FROM JobAdvertisement WHERE ad_id = %s
        """,
        (ad_id,),
    )


def apply_filter(request: JobAdFilterRequestModel):
    is_open = request.is_open
    pay_range_min = request.pay_range_min
    pay_range_max = request.pay_range_max
    type = request.type
    location = request.location
    setting = request.setting
    domain = request.domain
    skills = request.skills
    degrees = request.degrees

    query = ""
    if (is_open or pay_range_min or pay_range_max or type or location or setting or domain) is not None:
        query = "SELECT * FROM JobAdvertisement WHERE"
    else:
        query = "SELECT * FROM JobAdvertisement"
        return []

    first_found = False

    if pay_range_min is not None or pay_range_min == 0:
        if not first_found:
            query += " pay_range_min >= {0}".format(pay_range_min)
            first_found = True
        else:
            query += " AND pay_range_min >= {0}".format(pay_range_min)

    if pay_range_max is not None or pay_range_max == 0:
        if not first_found:
            query += " pay_range_max <= %s" % pay_range_max
            first_found = True
        else:
            query += " AND pay_range_max <= %s" % pay_range_max

    if type:
        if not first_found:
            query += " type = '%s'" % type
            first_found = True
        else:
            query += " AND type = '%s'" % type

    if location:
        if not first_found:
            query += " UPPER(location) LIKE UPPER({0})".format("'%%" + location + "%%'")
            first_found = True
        else:
            query += " AND UPPER(location) LIKE UPPER({0})".format("'%%" + location + "%%'")

    if is_open == 0 or is_open == 1:
        if not first_found:
            query += " is_open = %s" % is_open
            first_found = True
        else:
            query += " AND is_open = %s" % is_open

    if setting:
        if not first_found:
            query += " UPPER(setting) = UPPER({0})".format("'" + setting + "'")
            first_found = True
        else:
            query += " AND UPPER(setting) = UPPER({0})".format("'" + setting + "'")

        if domain:
            if not first_found:
                query += " UPPER(domain) LIKE UPPER({0})".format("'%%" + domain + "%%'")
                first_found = True
            else:
                query += " AND UPPER(domain) LIKE UPPER(%{0}%)".format("'%%" + domain + "%%'")

    if skills:
        # Create an inner query to get the ad_ids of the job advertisements that have the skills
        if not first_found:
            query += " ad_id IN (SELECT ad_id FROM SkillInJobAdvertisement WHERE"
            first_found = True
        else:
            query += " AND ad_id IN (SELECT ad_id FROM SkillInJobAdvertisement WHERE"

        for i, skill in enumerate(skills):
            if i != 0:
                query += " OR"
            query += " UPPER(skill_name) LIKE UPPER({0})".format("'%%" + skill + "%%'")
        query += ")"

    if degrees:
        # Create an inner query to get the ad_ids of the job advertisements that have the degrees
        if not first_found:
            query += " ad_id IN (SELECT ad_id FROM DegreeInJobAdvertisement WHERE"
            first_found = True
        else:
            query += " AND ad_id IN (SELECT ad_id FROM DegreeInJobAdvertisement WHERE"
        for i, degree in enumerate(degrees):
            if i != 0:
                query += " OR"
            query += " UPPER(degree_name) LIKE UPPER({0})".format("'%%" + degree + "%%'")
        query += ")"

    job_advertisements = query_get(query, ())

    for job_ad in job_advertisements:
        skill_list = query_get(
            """
                SELECT * FROM SkillInJobAdvertisement WHERE ad_id = %s
            """,
            (job_ad["ad_id"]),
        )

        degree_list = query_get(
            """
                SELECT * FROM DegreeInJobAdvertisement WHERE ad_id = %s
            """,
            (job_ad["ad_id"]),
        )

        job_ad["skills"] = skill_list
        job_ad["required_degrees"] = degree_list

    # if not job_advertisements:
    #     raise HTTPException(status_code=404, detail="Job Advertisement not found")

    return job_advertisements


def add_skill_in_job_advertisement(skill_in_job_request: SkillInJobRequestModel, ad_id: int):
    skill__id = query_put(
        """
            INSERT INTO  SkillInJobAdvertisement (ad_id, skill_name)
            VALUES (%s, %s)
        """,
        (
            ad_id,
            skill_in_job_request.skill_name,
        ),
    )

    response: SkillInJobResponseModel = SkillInJobResponseModel(
        skill_id=skill__id,
        ad_id=ad_id,
        skill_name=skill_in_job_request.skill_name,
    )

    return response


def add_degree_in_job_advertisement(degree_in_job_request: DegreeInJobRequestModel, ad_id: int):
    degree_id = query_put(
        """
            INSERT INTO DegreeInJobAdvertisement (ad_id, degree_name)
            VALUES (%s, %s)
        """,
        (
            ad_id,
            degree_in_job_request.degree_name,
        ),
    )

    response: DegreeInJobResponseModel = DegreeInJobResponseModel(
        ad_id=ad_id,
        degree_name=degree_in_job_request.degree_name,
        degree_id=degree_id,
    )

    return response


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
        apply_date=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        response_date=job_application_request.response_date,
        response=job_application_request.response,
        cv=job_application_request.cv,
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


def get_applications_by_profile_id(profile_id: int):
    applications = query_get(
        """
            SELECT * FROM JobAdvertisementResponse WHERE profile_id = %s
        """,
        (profile_id,),
    )

    if not applications:
        raise HTTPException(status_code=404, detail="Job Application not found")

    # Also get the job advertisement details
    for application in applications:
        job_ad = query_get(
            """
                SELECT * FROM JobAdvertisement WHERE ad_id = %s
            """,
            (application["ad_id"]),
        )
        application["ad_details"] = job_ad

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
        (
            job_application_request.response,
            datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            application_id,
        ),
    )

    application = get_application_by_application_id(application_id)

    return application
