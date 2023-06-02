import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  id: number = 5;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewAdDetails() {
    this.router.navigate(['/view-ad', this.id]);
  }
}
