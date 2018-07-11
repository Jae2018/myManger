import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPredoingPage } from './my-predoing';

@NgModule({
  declarations: [
    MyPredoingPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPredoingPage),
  ],
  entryComponents:[
    MyPredoingPage
  ]
})
export class MyPredoingPageModule {}
