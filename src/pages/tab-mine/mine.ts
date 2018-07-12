import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyBugReportListPage } from '../mine-bug-report-list/my-bug-report-list';
import { MinePwdChangePage } from '../mine-pwd-change/mine-pwd-change';
import { MineAboutUsPage } from '../mine-about-us/mine-about-us';
import { MineRepairHistoryPage } from '../mine-repair-history/mine-repair-history';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePage');
  }

  ionViewDidLeave() {
    console.log("app is eixit");
  }

  //修改密码
  changePwd(event){
    this.navCtrl.push(MinePwdChangePage);
  }

  //更新
  update(event){

  }

  //关于
  aboutus(event){
    this.navCtrl.push(MineAboutUsPage);
  }

  //注销
  doLoginOut(event){

  }

  //我的申请
  goMyreport(event){
    this.navCtrl.push(MyBugReportListPage);
  }

  //我的维修
  goMyRepair(event){
    this.navCtrl.push(MineRepairHistoryPage);
  }

}
