import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-ad-details',
  templateUrl: './view-ad-details.component.html',
  styleUrls: ['./view-ad-details.component.css']
})
export class ViewAdDetailsComponent implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }
}
