import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';



@NgModule({
  declarations: [ReportComponent],
  exports: [ReportComponent],
  imports: [
    CommonModule
  ]
})
export class ReportModule { }
