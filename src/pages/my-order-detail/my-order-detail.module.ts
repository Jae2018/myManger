import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOrderDetailPage } from './my-order-detail';

@NgModule({
  declarations: [
    MyOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyOrderDetailPage),
  ],
  entryComponents:[
    MyOrderDetailPage,
  ]
})
export class MyOrderDetailPageModule {}
