import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SystemReportService } from '../_services/system_report.service';
import { SystemReportResponseModel } from '../_models/system_report_models';

export interface RoleCount {
  role: string;
  count: number;
}

export interface DomainApplication {
  domain: string;
  ad_title: string;
  organization: string;
  application_count: number;
}

export interface SkillAverageRating {
  skill: string;
  average_rating: number;
}

export interface CompanyAverageAdView {
  company: string;
  average_ad_view: number;
}

export interface CompanyMaxMinPay {
  company: string;
  max_pay: number;
  min_pay: number;
}

const Role_COUNT_DATA: RoleCount[] = [
  { role: 'Administrator', count: 1 },
  { role: 'Professional', count: 2 },
  { role: 'Recruiter', count: 3 },
  { role: 'Career Expert', count: 4 },
  { role: 'Skill Assessor', count: 5 }
];

const Domain_APPLICATION_DATA: DomainApplication[] = [
  {
    domain: 'Software Engineering',
    ad_title: 'Software Engineer',
    organization: 'Google',
    application_count: 1
  },
  {
    domain: 'Academic',
    ad_title: 'Professor',
    organization: 'MIT',
    application_count: 5
  }
];

const Skill_AVERAGE_RATING_DATA: SkillAverageRating[] = [
  { skill: 'Java', average_rating: 1 },
  { skill: 'Python', average_rating: 2 },
  { skill: 'C++', average_rating: 3 }
];

const Company_AVERAGE_AD_VIEW_DATA: CompanyAverageAdView[] = [
  { company: 'Google', average_ad_view: 1 },
  { company: 'MIT', average_ad_view: 2 },
  { company: 'Facebook', average_ad_view: 3 }
];

const Company_MAX_MIN_PAY_DATA: CompanyMaxMinPay[] = [
  { company: 'Google', max_pay: 1, min_pay: 2 },
  { company: 'MIT', max_pay: 3, min_pay: 4 },
  { company: 'Facebook', max_pay: 5, min_pay: 6 }
];

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  roleCountDisplayedColumns = ['role', 'count'];
  domainApplicationDisplayedColumns = [
    'domain',
    'ad_title',
    'organization',
    'application_count'
  ];
  skillAverageRatingDisplayedColumns = ['skill', 'average_rating'];
  companyAverageAdViewDisplayedColumns = ['company', 'average_ad_view'];
  companyMaxMinPayDisplayedColumns = ['company', 'max_pay', 'min_pay'];

  RoleCountSource: MatTableDataSource<RoleCount> =
    new MatTableDataSource<RoleCount>(Role_COUNT_DATA);
  @ViewChild('RoleCountTable') RoleCountTable!: MatTable<RoleCount>;

  DomainApplicationSource: MatTableDataSource<DomainApplication> =
    new MatTableDataSource<DomainApplication>(Domain_APPLICATION_DATA);
  @ViewChild('DomainApplicationTable')
  DomainApplicationTable!: MatTable<DomainApplication>;

  SkillAverageRatingSource: MatTableDataSource<SkillAverageRating> =
    new MatTableDataSource<SkillAverageRating>(Skill_AVERAGE_RATING_DATA);
  @ViewChild('SkillAverageRatingTable')
  SkillAverageRatingTable!: MatTable<SkillAverageRating>;

  CompanyAverageAdViewSource: MatTableDataSource<CompanyAverageAdView> =
    new MatTableDataSource<CompanyAverageAdView>(Company_AVERAGE_AD_VIEW_DATA);
  @ViewChild('CompanyAverageAdViewTable')
  CompanyAverageAdViewTable!: MatTable<CompanyAverageAdView>;

  CompanyMaxMinPaySource: MatTableDataSource<CompanyMaxMinPay> =
    new MatTableDataSource<CompanyMaxMinPay>(Company_MAX_MIN_PAY_DATA);
  @ViewChild('CompanyMaxMinPayTable')
  CompanyMaxMinPayTable!: MatTable<CompanyMaxMinPay>;

  domainApplicationsStartDate: Date;
  domainApplicationsEndDate: Date;

  leastPublishedAdsStartDate: Date;
  leastPublishedAdsEndDate: Date;

  systemReport: SystemReportResponseModel;

  constructor(private systemReportService: SystemReportService) {}

  ngOnInit(): void {
    this.systemReportService.getSystemReports().subscribe(response => {
      console.log(response);
      let temp = {
        report_id: response.report_id,
        total_num_of_ads: {
          total_num_of_users: response.total_num_of_ads.total_num_of_users,
          total_num_of_ads: response.total_num_of_ads.total_num_of_ads,
          total_num_of_applications:
            response.total_num_of_ads.total_num_of_applications,
          total_num_of_views: response.total_num_of_ads.total_num_of_views
        },
        num_of_users_each_role: {
          roles: response.num_of_users_each_role.roles,
          num_of_users: response.num_of_users_each_role.num_of_users
        },
        average_skill_rating_of_each_skill: {
          skills: response.average_skill_rating_of_each_skill.skills,
          average_skill_rating:
            response.average_skill_rating_of_each_skill.average_skill_rating
        },
        average_number_of_ad_views_for_company: {
          company_names:
            response.average_number_of_ad_views_for_company.company_names,
          average_number_of_ad_views:
            response.average_number_of_ad_views_for_company
              .average_number_of_ad_views
        },
        minimum_and_maximum_pay_averages: {
          company_names:
            response.minimum_and_maximum_pay_averages.company_names,
          minimum_pay_averages:
            response.minimum_and_maximum_pay_averages.minimum_pay_averages,
          maximum_pay_averages:
            response.minimum_and_maximum_pay_averages.maximum_pay_averages
        }
      };
      this.systemReport = response;
    });
  }
}
