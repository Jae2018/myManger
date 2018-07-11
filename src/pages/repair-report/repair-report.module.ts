import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairReportPage } from './repair-report';

@NgModule({
  declarations: [
    RepairReportPage,
  ],
  imports: [
    IonicPageModule.forChild(RepairReportPage),
  ],
  entryComponents:[
    RepairReportPage,
  ]
})
export class RepairReportPageModule {}
