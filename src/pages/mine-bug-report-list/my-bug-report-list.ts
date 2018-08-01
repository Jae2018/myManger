import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyBugReportPage } from '../mine-bug-report/my-bug-report';


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
  type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.type = '1';
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
    this.navCtrl.push(MyBugReportPage);
  }

  goDetail(event, index) {
    this.navCtrl.push(MyBugReportPage);
  }

}
