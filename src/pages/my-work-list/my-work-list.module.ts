import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyWorkListPage } from './my-work-list';

@NgModule({
  declarations: [
    MyWorkListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyWorkListPage),
  ],
  entryComponents:[
    MyWorkListPage
  ],
  exports:[MyWorkListPage]
})
export class MyWorkListPageModule {}
