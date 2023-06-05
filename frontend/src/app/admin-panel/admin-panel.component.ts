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
  domainApplicationDisplayedColumns = ['domain', 'ad_title', 'organization', 'application_count'];
  skillAverageRatingDisplayedColumns = ['skill', 'average_rating'];
  companyAverageAdViewDisplayedColumns = ['company', 'average_ad_view'];
  companyMaxMinPayDisplayedColumns = ['company', 'max_pay', 'min_pay'];
  totalNumberOfUsersDisplayedColumns = ['total_number_of_users', 'total_number_of_ads', 'total_number_of_applications', 'total_number_of_views'];

  totalNumberOfUsers: NumberOfUsers[] = [];
  roleCountSource: RoleCount[] = [];
  domainApplicationSource: DomainApplication[] = [];
  skillAverageRatingSource: SkillAverageRating[] = [];
  companyAverageAdViewSource: CompanyAverageAdView[] = [];
  companyMaxMinPaySource: CompanyMaxMinPay[] = [];

  systemReport: SystemReportResponseModel;

  constructor(private systemReportService: SystemReportService) {}

  ngOnInit(): void {
    this.systemReportService.getSystemReports().subscribe(response => {
      this.systemReport = response;
      this.roleCountSource = response.num_of_users_each_role.roles.map((role, index) => ({
        role,
        count: response.num_of_users_each_role.num_of_users[index]
      }));
      this.domainApplicationSource = response.highest_applications_each_domain.domain_applications.map(app => ({
        domain: app.domain,
        ad_title: app.ad_title,
        organization: app.organization,
        application_count: app.application_count
      }));
      this.skillAverageRatingSource = response.average_skill_rating_of_each_skill.skills.map((skill, index) => ({
        skill,
        average_rating: response.average_skill_rating_of_each_skill.average_skill_rating[index]
      }));
      this.companyAverageAdViewSource = response.average_number_of_ad_views_for_company.company_names.map((company, index) => ({
        company,
        average_ad_view: response.average_number_of_ad_views_for_company.average_number_of_ad_views[index]
      }));
      this.companyMaxMinPayDisplayedColumns = response.minimum_and_maximum_pay_averages.company_names.map((company, index) => ({
        company,
        max_pay: response.minimum_and_maximum_pay_averages.maximum_pay_averages[index],
        min_pay: response.minimum_and_maximum_pay_averages.minimum_pay_averages[index]
      }));
    });
  }
}
