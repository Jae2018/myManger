import { Component, ViewChild } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Tabs,Events } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root, Tab4Root, Tab5Root } from '..';
import { Storage } from '@ionic/storage';
import { GlobalUtils } from '../../providers/utils/loading-dialog-global';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild(Tabs)
  tabs;

  constructor(private storge: Storage, private navCtrl: NavController, public global: GlobalUtils,private events:Events) {

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

  ionViewDidLoad() {
    this.listenEvents();
    // console.log('界面创建');
  }

  ionViewWillUnload() {
    this.events.unsubscribe('toLogin');
    // console.log('界面销毁');
  }

  listenEvents() {
    this.events.subscribe('toLogin', () => {
      this.navCtrl.setRoot(LoginPage);
      // this.nav.pop(); 使用这种方式也可以，但是会在登录框中默认填上值
      // console.log('返回登录');
    });
  }

}
