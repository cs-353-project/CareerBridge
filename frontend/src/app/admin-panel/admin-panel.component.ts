import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SystemReportService } from '../_services/system_report.service';
import { SystemReportResponseModel } from '../_models/system_report_models';

export interface NumberOfUsers {
  total_number_of_users: number;
  total_number_of_ads: number;
  total_number_of_applications: number;
  total_number_of_views: number;
}

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
  totalNumberOfUsersDisplayedColumns = [
    'total_number_of_users',
    'total_number_of_ads',
    'total_number_of_applications',
    'total_number_of_views'
  ];

  @ViewChild('roleCountTable') roleCountTable!: MatTable<RoleCount>;
  @ViewChild('domainApplicationTable')
  domainApplicationTable!: MatTable<DomainApplication>;
  @ViewChild('skillAverageRatingTable')
  skillAverageRatingTable!: MatTable<SkillAverageRating>;
  @ViewChild('companyAverageAdViewTable')
  companyAverageAdViewTable!: MatTable<CompanyAverageAdView>;
  @ViewChild('companyMaxMinPayTable')
  companyMaxMinPayTable!: MatTable<CompanyMaxMinPay>;

  totalNumber: NumberOfUsers;
  roleCountSource: RoleCount[] = [];
  domainApplicationSource: DomainApplication[] = [];
  skillAverageRatingSource: SkillAverageRating[] = [];
  companyAverageAdViewSource: CompanyAverageAdView[] = [];
  companyMaxMinPaySource: CompanyMaxMinPay[] = [];

  systemReport: SystemReportResponseModel;

  ad_type: string;
  ad_type_count: number;

  constructor(private systemReportService: SystemReportService) {}

  ngOnInit(): void {
    this.systemReportService.getSystemReports().subscribe(response => {
      console.log(response);
      let temp: NumberOfUsers = {
        total_number_of_users: response.total_num_of_ads.total_num_of_users,
        total_number_of_ads: response.total_num_of_ads.total_num_of_ads,
        total_number_of_applications:
          response.total_num_of_ads.total_num_of_applications,
        total_number_of_views: response.total_num_of_ads.total_num_of_views
      };
      this.totalNumber = temp;
      for (
        let i = 0;
        i < response?.num_of_users_each_role?.num_of_users?.length;
        i++
      ) {
        this.roleCountSource.push({
          role: response.num_of_users_each_role.roles[i],
          count: response.num_of_users_each_role.num_of_users[i]
        });
      }
      this.roleCountTable.dataSource = this.roleCountSource;
      this.roleCountTable.renderRows();

      for (
        let i = 0;
        i < response?.highest_applications_each_domain?.titles?.length;
        i++
      ) {
        let temp: DomainApplication = {
          domain: response.highest_applications_each_domain.domains[i],
          ad_title: response.highest_applications_each_domain.titles[i],
          organization:
            response.highest_applications_each_domain.organizations[i],
          application_count:
            response.highest_applications_each_domain.num_of_applications[i]
        };
        this.domainApplicationSource.push(temp);
      }
      this.domainApplicationTable.dataSource = this.domainApplicationSource;
      this.domainApplicationTable.renderRows();

      for (
        let i = 0;
        i < response?.average_skill_rating_of_each_skill?.skill_names?.length;
        i++
      ) {
        this.skillAverageRatingSource.push({
          skill: response.average_skill_rating_of_each_skill.skill_names[i],
          average_rating:
            response.average_skill_rating_of_each_skill.average_ratings[i]
        });
      }
      this.skillAverageRatingTable.dataSource = this.skillAverageRatingSource;
      this.skillAverageRatingTable.renderRows();

      this.ad_type = response.least_published_ad_type_for_interval[0].ad_type;
      this.ad_type_count =
        response.least_published_ad_type_for_interval[0].num_of_ad;

      for (
        let i = 0;
        i <
        response?.average_number_of_ad_views_for_company?.company_names?.length;
        i++
      ) {
        this.companyAverageAdViewSource.push({
          average_ad_view:
            response.average_number_of_ad_views_for_company
              .average_number_of_ad_views[i],
          company:
            response.average_number_of_ad_views_for_company.company_names[i]
        });
      }
      this.companyAverageAdViewTable.dataSource =
        this.companyAverageAdViewSource;
      this.companyAverageAdViewTable.renderRows();

      for (
        let i = 0;
        i < response?.minimum_and_maximum_pay_averages?.company_names?.length;
        i++
      ) {
        this.companyMaxMinPaySource.push({
          company: response.minimum_and_maximum_pay_averages.company_names[i],
          max_pay:
            response.minimum_and_maximum_pay_averages.maximum_pay_averages[i],
          min_pay:
            response.minimum_and_maximum_pay_averages.minimum_pay_averages[i]
        });
      }
      this.companyMaxMinPayTable.dataSource = this.companyMaxMinPaySource;
      this.companyMaxMinPayTable.renderRows();
    });
  }
}
