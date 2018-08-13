import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { BaseUrl, homeOrderList } from '..';
import { RepairOrderPage } from '../repair-order/repair-order';
import { Api } from '../../providers';
import { Sms } from '../../models/sms';
import { Order } from '../../models/order';

/**
 * Generated class for the MyWorkListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-work-list',
  templateUrl: 'my-work-list.html',
})
export class MyWorkListPage {

  items = [];
  state: any;
  type;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private api: Api,
    private loading: LoadingController) {
    this.type = navParams.get('type');
  }



  ionViewDidLoad() {
    this.getDetail();
  }

  getDetail() {
    let loading = this.loading.create();
    loading.present();

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Cache-Control', 'no-cache')
      .set('Authorization', this.api.getToken())

    let params = { 'type': this.type }

    let options = {
      headers: httpHeaders,
      params: params
    };

    this.http.post<Sms<Order[]>>(BaseUrl + homeOrderList, null, options).subscribe((res) => {
      this.items = res.data;
      loading.dismiss();
      console.log(this.items)
    }, err => {

    });

  }

  // doInfinite(): Promise<any> {
  //   console.log('Begin async operation');

  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       for (var i = 0; i < 5; i++) {
  //         this.items.push(
  //           {
  //             title: "呵呵",
  //             content: "哈哈"
  //           }
  //         );
  //       }

  //       console.log('Async operation has ended');
  //       resolve();
  //     }, 1000);
  //   })
  // }

  goDetail(i) {
    this.navParams.data = { maiId: this.items[i].orderId };
    this.navCtrl.push(RepairOrderPage, this.navParams);
  }

}
