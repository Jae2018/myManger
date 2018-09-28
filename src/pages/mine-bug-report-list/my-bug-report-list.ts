import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyBugReportPage } from '../mine-bug-report/my-bug-report';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { BaseUrl, mineReport } from '..';
import { Storage } from '../../../node_modules/@ionic/storage';
import { Api } from '../../providers';
import { Sms } from '../../models/sms';
import { MyReport } from '../../models/my-report';


/**
 * Generated class for the MyBugReportListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-bug-report-list',
  templateUrl: 'my-bug-report-list.html',
})
export class MyBugReportListPage {

  list = [];
  type: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private api: Api) {
    this.type = '1';
  }

  ionViewDidLoad() {
    this.getData();
  }

  getData() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let params = { 'type': this.type };
    console.log(this.type)
    let options = {
      headers: httpHeaders,
      params: params
    };

    this.http.post<Sms<MyReport[]>>(BaseUrl + mineReport, null, options).subscribe(res => {
      this.list = res.data;
      console.log(res.data)
    }, err => {
      console.log(err)
    })

  }

  goDetail1(event, index) {
    this.navCtrl.push(MyBugReportPage);
  }

  goDetail(event, index) {
    this.navCtrl.push(MyBugReportPage);
  }

}
