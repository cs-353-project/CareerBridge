import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CareerBridge';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      `dashboard`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/dashboard.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `plus`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/plus.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `send`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/send.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `attachment`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/attachment.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `emoji`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/emoji.svg'
      )
    );
  }
}
