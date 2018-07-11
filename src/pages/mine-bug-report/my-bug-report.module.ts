import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBugReportPage } from './my-bug-report';

@NgModule({
  declarations: [
    MyBugReportPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBugReportPage),
  ],
})
export class MyBugReportPageModule {}
