import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreRepairOrdersPage } from './store-repair-orders';

@NgModule({
  declarations: [
    StoreRepairOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreRepairOrdersPage),
  ],
})
export class StoreRepairOrdersPageModule {}
