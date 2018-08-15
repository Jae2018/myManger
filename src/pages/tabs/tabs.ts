import { Component, ViewChild } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Tabs } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root, Tab4Root, Tab5Root } from '..';
import { Storage } from '@ionic/storage';
import { GlobalUtils } from '../../providers/utils/loading-dialog-global';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild(Tabs)
  tabs;

  constructor(private storge: Storage, private navCtrl: NavController, public global: GlobalUtils) {

    this.global.registerBackButtonAction(this.tabs);
  }

  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;
  tab5Root: any = Tab5Root;

  tab1Title = "工单";
  tab2Title = "店铺";
  tab3Title = "备件管理";
  tab4Title = "巡检";
  tab5Title = "我的";

}
