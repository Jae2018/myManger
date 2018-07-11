import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBugReportListPage } from './my-bug-report-list';

@NgModule({
  declarations: [
    MyBugReportListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBugReportListPage),
  ],
})
export class MyBugReportListPageModule {}
