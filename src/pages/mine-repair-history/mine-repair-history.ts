import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { BaseUrl, mineRepair } from '..';
import { Storage } from '../../../node_modules/@ionic/storage';
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
  type = '1';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private api: Api) {
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
      this.list = res.data;
      console.log(res.data)
    }, err => {

    })

  }
}
