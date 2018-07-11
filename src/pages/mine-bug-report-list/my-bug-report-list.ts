import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Tabs, Tab } from 'ionic-angular';


/**
 * Generated class for the MyBugReportListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-bug-report-list',
  templateUrl: 'my-bug-report-list.html',
})
export class MyBugReportListPage {

  list = [];
  type = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBugReportListPage');
    this.getData();
  }

  getData() {
    for (var i = 0; i < 5; i++) {
      this.list.push(
        {
          title: "测试数据",
          content: i,
          specification: "测试规格",
          time: "测试时间",
          orderId: "测试工单ID",
          state: "测试设备状态"
        })
    }
  }

  goDetail1(event, index) {

  }

  goDetail(event, index) {

  }

}
