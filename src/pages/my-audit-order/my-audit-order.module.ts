import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAuditOrderPage } from './my-audit-order';

@NgModule({
  declarations: [
    MyAuditOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAuditOrderPage),
  ],
  entryComponents:[
    MyAuditOrderPage,
  ]
})
export class MyAuditOrderPageModule {}
