import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-ad-details',
  templateUrl: './view-ad-details.component.html',
  styleUrls: ['./view-ad-details.component.css']
})
export class ViewAdDetailsComponent implements OnInit {
  id: string;
  text: string = `
  Responsibilities 
Work on data-driven projects from start to finish while meeting technical and creative requirements. 
Collaborate with data scientists, engineers, and product managers to iterate rapidly and deliver innovative solutions.
Analyze data using statistical methods to derive insights and make data-driven decisions.
Work with large datasets and develop algorithms for predictive modeling, data classification, and data clustering.
Participate in regular data science reviews and other team-wide data science efforts; contribute to a great data science team culture.
Stay up-to-date with the latest data science technologies and techniques, and share knowledge with team members.
Document data science workflows and share best practices with team members.
  
  `;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }
}
