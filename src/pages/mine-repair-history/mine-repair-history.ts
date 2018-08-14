import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { BaseUrl, mineRepair } from '..';
import { Api } from '../../providers';
import { Sms } from '../../models/sms';
import { History } from '../../models/history';

/**
 * Generated class for the MineRepairHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine-repair-history',
  templateUrl: 'mine-repair-history.html',
})
export class MineRepairHistoryPage {

  list = [];
  type = '0';
  date = '1';
  totalHours = 2;
  orderNum = 3;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private api: Api,
    private alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MineRepairHistoryPage');
    this.getData();
  }

  getData() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let params = { 'type': this.type }

    let options = {
      headers: httpHeaders,
      params: params
    };
    this.http.post<Sms<History[]>>(BaseUrl + mineRepair, null, options).subscribe(res => {
      this.list = res.data['list'];
      this.totalHours = res.data['totalHours'];
      this.orderNum = res.data['orderNum'];
      console.log(res.data)
    }, err => {

    })

  }

  changeDate() {
    let alert = this.alert.create();
    alert.setTitle('请选择时间段');
    alert.addInput({
      type: 'radio',
      label: '今日',
      value: '今日',
      handler: data => {
        this.date = data;
        this.type = '0';
      }
    });

    alert.addInput({
      type: 'radio',
      label: '本周',
      value: '本周',
      handler: data => {
        this.date = data;
        this.type = '1';
      }
    });

    alert.addInput({
      type: 'radio',
      label: '本月',
      value: '本月',
      handler: data => {
        this.date = data;
        this.type = '2';
      }
    });

    alert.addInput({
      type: 'radio',
      label: '上月',
      value: '上月',
      handler: data => {
        this.date = data;
        this.type = '3';
      }
    });

    alert.present();
  }

}
