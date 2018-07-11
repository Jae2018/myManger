import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepairReportPage } from '../repair-report/repair-report';

/**
 * Generated class for the MyPredoingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-predoing',
  templateUrl: 'my-predoing.html',
})
export class MyPredoingPage {

  public list = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // let time = new Date().getDate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPredoingPage');
    for (var i = 0; i < 5; i++) {
      this.list.push(
        {
          title: "测试数据",
          content: i,
          specification: "测试规格",
          time: "测试时间",
          orderId: "测试工单ID",
          state: "测试设备状态",
        })
    }
  }

  goDetail(){
    this.navCtrl.push(RepairReportPage);
  }

  ionViewWillUnload(){
    // let currentIndex = this.navCtrl.getActive().index;
    // this.navCtrl.push(MainPage).then(() => {
      // this.navCtrl.remove(currentIndex);
    // });
  }

}
