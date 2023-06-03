import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewAdDialogComponent } from './new-ad-dialog/new-ad-dialog.component';
@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  id: number = 5;
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  viewAdDetails() {
    this.router.navigate(['/view-ad', this.id]);
  }

  createAd() {
    console.log('create ad');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = null;
    const dialogRef = this.dialog.open(NewAdDialogComponent, dialogConfig);
  }
}
