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

  changePwd(event){
    this.navCtrl.push(MinePwdChangePage);
  }

  update(event){

  }

  aboutus(event){
    this.navCtrl.push(MineAboutUsPage);
  }

  doLoginOut(event){

  }

  goMyreport(event){
    this.navCtrl.push(MyBugReportListPage);
  }

  goMyRepair(event){
    this.navCtrl.push(MineRepairHistoryPage);
  }

}
