import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyOrderDetailPage } from '../my-order-detail/my-order-detail';

/**
 * Generated class for the MyAuditOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-audit-order',
  templateUrl: 'my-audit-order.html',
})
export class MyAuditOrderPage {

  public list = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAuditOrderPage');
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

  goDetail(index) {
    this.navParams = this.list[index];
    this.navCtrl.push(MyOrderDetailPage, this.navParams);
  }

}
