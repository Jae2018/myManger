import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, Refresher, NavParams } from 'ionic-angular';
import { MyWorkListPage } from '../my-work-list/my-work-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyAuditOrderPage } from '../my-audit-order/my-audit-order';
import { MyPredoingPage } from '../my-predoing/my-predoing';
import { BaseUrl, homeOrderinfo } from '..';
import { Order } from '../../models/order';
import { Sms } from '../../models/sms';

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

  orders; doing; audit; prepare;
  show: boolean;
  show2: boolean;
  show3: boolean;
  show4: boolean;

  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private param: NavParams) {

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad WorkListPage');
    // this.item = {
    //   orders: 3,//我的工单
    //   audit: 6,//申报
    //   doing: 4,//正在执行
    //   prepare: 5,//待执行
    // };
    this.show = false;
    this.show2 = false;
    this.show3 = false;
    this.show4 = false;
    this.getData();
  }

  ionViewDidEnter() {
    //栈底到栈顶，显示后
    this.getData();
  }



  getData() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYnl3IiwidXNlcklkIjo3Niwicm9sZUlkIjo3MSwiY29tcElkIjo5NCwiZW50VHlwZSI6IjEiLCJleHAiOjE1MzM4MDU5Mjl9.VcFx9dwfe1-NxAXtahCBd_V7fQVEYlCWq65tp3GY2cQGzGgVzjeX-XY4D6syBEUmi8U2LO-StYt4DEy0HhKoqw');

    let options = {
      headers: httpHeaders
    };

    this.http.post<Sms<Order>>(BaseUrl + homeOrderinfo, null, options).subscribe(res => {
      this.orders = res.data.orders;
      this.audit = res.data.audit;
      this.doing = res.data.doing;
      this.prepare = res.data.prepare;
      this.show = this.orders > 0;
      this.show2 = this.audit > 0;
      this.show3 = this.doing > 0;
      this.show4 = this.prepare > 0;
    }, error => {
      console.error(error);
    });

  }

  //工单
  goMyWorkListPage(event) {
    this.param.data = { type: 0 };
    this.navCtrl.push(MyWorkListPage, this.param);
  }

  //待审核
  goAudit(event) {
    this.param.data = { type: 1 };
    this.navCtrl.push(MyWorkListPage, this.param);
  }

  //待执行
  goPredoing(event) {
    this.param.data = { type: 2 };
    this.navCtrl.push(MyWorkListPage, this.param);
  }

  //已完成
  goDone(event) {
    // this.navCtrl.push()
    this.param.data = { type: 3 };
    this.navCtrl.push(MyWorkListPage, this.param);
  }

  scan(event: any) {
    this.navCtrl.push('ScanPage');
  }

}
