import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { MyBugReportListPage } from '../mine-bug-report-list/my-bug-report-list';
import { MinePwdChangePage } from '../mine-pwd-change/mine-pwd-change';
import { MineAboutUsPage } from '../mine-about-us/mine-about-us';
import { MineRepairHistoryPage } from '../mine-repair-history/mine-repair-history';
import { Storage } from "@ionic/storage";
import { User } from '../../models/user';
import { LoginPage } from '../login/login';

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {

  public list = [];
  public list2 = [];
  public pages = [];
  public pages2 = [];
  user: User;
  userNmae;
  // avatorUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storge: Storage,private events:Events) {

  }

  ionViewDidLoad() {
    this.storge.get('account').then((user: User) => {
      console.log(user)
      this.userNmae = user['tel'];
      // this.avatorUrl = user.url ? user.url : 'assets/icon/avatar.png';
    })
  }

  ionViewDidLeave() {
    console.log("app is eixit");
  }

  getToken() {
    var token;
    this.storge.get('account').then(user => {
      token = user['token']
    })
    return token;
  }

  //修改密码
  changePwd(event) {
    this.navCtrl.push(MinePwdChangePage);
  }

  //更新
  update(event) {

  }

  //关于
  aboutus(event) {
    this.navCtrl.push(MineAboutUsPage);
  }

  //注销
  doLoginOut(event) {
    this.storge.remove('user');
    this.events.publish('toLogin');
    // this.navCtrl.pop();
  }

  //我的申请
  goMyreport(event) {
    this.navCtrl.push(MyBugReportListPage);
  }

  //我的维修
  goMyRepair(event) {
    this.navCtrl.push(MineRepairHistoryPage);  
  }

}
