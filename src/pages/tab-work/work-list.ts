import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, Refresher } from 'ionic-angular';
import { MyWorkListPage } from '../my-work-list/my-work-list';
import { HttpClient } from '@angular/common/http';
import { MyAuditOrderPage } from '../my-audit-order/my-audit-order';
import { MyPredoingPage } from '../my-predoing/my-predoing';

/**
 * Generated class for the WorkListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-list',
  templateUrl: 'work-list.html',
})
export class WorkListPage {

  @ViewChild(Refresher)
  refresh: Refresher;

  item = {};

  constructor(public navCtrl: NavController, public http: HttpClient, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad WorkListPage');
    this.item = {
      orders: 3,//我的工单
      audit: 6,//申报
      doing: 4,//正在执行
      prepare: 5,//待执行
    };
  }

  ionViewDidEnter() {
    //栈底到栈顶，显示后
     this.getData();
  }



  getData() {
    this.http.get('http://39.108.159.135/api/plist?is_best=1').subscribe(data => {
      console.log(data);
    }, error => {
      console.error(error);
    });

  }

  //工单
  goMyWorkListPage(event) {
    this.navCtrl.push(MyWorkListPage);
  }

  //待审核
  goAudit(event) {
    console.log(this.navCtrl.getActive().index);
    this.navCtrl.push(MyAuditOrderPage);
  }

  //待执行
  goPredoing(event) {
    this.navCtrl.push(MyPredoingPage);
  }

  //已完成
  goDone(event) {
    // this.navCtrl.push()
  }

  scan(event: any) {
    this.navCtrl.push('ScanPage');
  }

}
