import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      preventDuplicates: true,
      countDuplicates: true,
      progressBar: true,
      timeOut: 5000,
      maxOpened: 5
    }),
    NgxSpinnerModule
  ],
  exports: [ToastrModule, NgxSpinnerModule]
})
export class SharedModule {}
