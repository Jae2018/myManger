import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRepairReportPage } from './add-repair-report';

@NgModule({
  declarations: [
    AddRepairReportPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRepairReportPage),
  ],
  entryComponents:[
    AddRepairReportPage
  ]
})
export class AddRepairReportPageModule {}
