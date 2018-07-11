import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkListPage } from './work-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WorkListPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkListPage),
    TranslateModule.forChild()
  ],
  entryComponents:[
    WorkListPage
  ]
})
export class WorkListPageModule {}
