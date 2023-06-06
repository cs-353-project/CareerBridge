import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserModel } from '../_models/user_models';
import { ProfileService } from '../_services/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  dataSource: MatTableDataSource<BasicUserModel>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatTable) allUsersTable!: MatTable<BasicUserModel>;

  users: BasicUserModel[] = [];

  displayedColumns = ['id', 'name', 'actions'];

  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService
  ) {
    this.profileService.getAllUsers().subscribe(
      res => {
        if (res) {
          res.forEach(element => {
            let temp = {
              user_id: element.user_id,
              name: element.first_name + ' ' + element.last_name
            };
            this.users.push(temp);
          });
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.allUsersTable.dataSource = this.dataSource;
          this.allUsersTable.renderRows();
        }
      },
      error => {
        this.toastr.error('Error while fetching users.');
      }
    );
  }

  ngOnInit(): void {}
}

export interface BasicUserModel {
  user_id: number;
  name: string;
}
