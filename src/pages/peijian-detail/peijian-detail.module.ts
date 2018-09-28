import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeijianDetailPage } from './peijian-detail';

@NgModule({
  declarations: [
    PeijianDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PeijianDetailPage),
  ],
})
export class PeijianDetailPageModule {}
