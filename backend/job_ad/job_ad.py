import datetime
from fastapi import HTTPException

from database.query import query_get, query_put, query_update

from .models import( JobAdvertisementResponseModel,
                     JobAdvertisementRequestModel)

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

def delete_job_adviertisement(ad_id: int):
    query_update(
        """
            DELETE FROM JobAdvertisement WHERE ad_id = %s
        """,
        (ad_id,),
    )






    
