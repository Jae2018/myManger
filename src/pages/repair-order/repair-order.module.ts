import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairOrderPage } from './repair-order';

@NgModule({
  declarations: [
    RepairOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(RepairOrderPage),
  ],
  entryComponents:[
    RepairOrderPage,
  ]
})
export class RepairOrderPageModule {}
