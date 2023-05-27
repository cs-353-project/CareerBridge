import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  activeElement = 'information';

  constructor() {}

  ngOnInit(): void {}

  setActiveElement(element) {
    this.activeElement = element;
  }
}
