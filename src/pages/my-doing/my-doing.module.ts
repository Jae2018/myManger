import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {  MyDoingPage } from './my-doing';

@NgModule({
  declarations: [
    MyDoingPage,
  ],
  imports: [
    IonicPageModule.forChild( MyDoingPage),
  ],
  entryComponents:[
    MyDoingPage
  ]
})
export class MyDoingPageModule {}
