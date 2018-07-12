import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreBugReportPage } from './store-bug-report';

@NgModule({
  declarations: [
    StoreBugReportPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreBugReportPage),
  ],
})
export class StoreBugReportPageModule {}
