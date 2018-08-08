import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepairReportPage } from '../repair-report/repair-report';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { BaseUrl, homeOrderList } from '..';
import { RepairOrderPage } from '../repair-order/repair-order';

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
    private http: HttpClient) {
      this.type = navParams.get('type');
  }

  ionViewDidLoad() {
    this.getDetail();
  }

  getDetail() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYnl3IiwidXNlcklkIjo3Niwicm9sZUlkIjo3MSwiY29tcElkIjo5NCwiZW50VHlwZSI6IjEiLCJleHAiOjE1MzM4MDU5Mjl9.VcFx9dwfe1-NxAXtahCBd_V7fQVEYlCWq65tp3GY2cQGzGgVzjeX-XY4D6syBEUmi8U2LO-StYt4DEy0HhKoqw');
    let params = { 'type': '0' }
    let options = {
      headers: httpHeaders,
      params: params
    };
    this.http.post(BaseUrl + homeOrderList, options).subscribe(res => {
      console.log(res)
    }, err => {

    });
    //测试数据
    for (var i = 0; i < 5; i++) {
      this.items.push(
        {
          title: "呵呵",
          content: "哈哈"
        }
      );
    }
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {
      setTimeout(() => {
        for (var i = 0; i < 5; i++) {
          this.items.push(
            {
              title: "呵呵",
              content: "哈哈"
            }
          );
        }

        console.log('Async operation has ended');
        resolve();
      }, 1000);
    })
  }

  goDetail() {
    this.navCtrl.push(RepairOrderPage, this.navParams);
  }

}
