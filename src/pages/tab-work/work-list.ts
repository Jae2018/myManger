import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, Refresher, NavParams, ModalController } from 'ionic-angular';
import { MyWorkListPage } from '../my-work-list/my-work-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrl, homeOrderinfo } from '..';
import { Sms } from '../../models/sms';
import { ScanPage } from '../scan/scan';
import { Api } from '../../providers/api/api';
import { OrderTpye } from '../../models/ordertpye';


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
    private param: NavParams,
    private model: ModalController,
    private api: Api) {

  }

  ionViewDidLoad() {
    this.show = false;
    this.show2 = false;
    this.show3 = false;
    this.show4 = false;
  }

  ionViewDidEnter() {
    //栈底到栈顶，显示后
    this.getData();
  }

  getData() {
    let loading = this.loadingCtrl.create();
    loading.present();

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let options = {
      headers: httpHeaders
    };

    this.http.post<Sms<OrderTpye>>(BaseUrl + homeOrderinfo, null, options).subscribe(res => {
      this.orders = res.data.orders;
      this.audit = res.data.audit;
      this.doing = res.data.doing;
      this.prepare = res.data.prepare;
      this.show = this.orders > 0;
      this.show2 = this.audit > 0;
      this.show3 = this.doing > 0;
      this.show4 = this.prepare > 0;
      loading.dismiss();
    }, err => {
      //
      loading.dismiss();
    });
    // let headers = new Headers();
    // headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // headers.set('Authorization', this.api.getToken());
    // let options = new RequestOptions({
    //   headers: headers
    // });
    // this.http.post(BaseUrl + homeOrderinfo, null, options).map(res => { res.json() }).subscribe(data => {
    //   console.log(data)
    // })

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
    // this.navCtrl.push('ScanPage');
    let newsModal = this.model.create(ScanPage);
    newsModal.onDidDismiss(data => {
      console.log(data);
    });
    newsModal.present();
  }

}
