import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyDoingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-doing',
  templateUrl: 'my-doing.html',
})
export class MyDoingPage {

  public list = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getScrollData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDoingPage');
  }

  getScrollData() {
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

  doClick() {

  }

}
