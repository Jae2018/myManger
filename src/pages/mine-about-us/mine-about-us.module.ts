import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MineAboutUsPage } from './mine-about-us';

@NgModule({
  declarations: [
    MineAboutUsPage,
  ],
  imports: [
    IonicPageModule.forChild(MineAboutUsPage),
  ],
  entryComponents:[
    MineAboutUsPage
  ]
})
export class MineAboutUsPageModule {}
