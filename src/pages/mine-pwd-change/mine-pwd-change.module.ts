import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinePwdChangePage } from './mine-pwd-change';

@NgModule({
  declarations: [
    MinePwdChangePage,
  ],
  imports: [
    IonicPageModule.forChild(MinePwdChangePage),
  ],
})
export class MinePwdChangePageModule {}
