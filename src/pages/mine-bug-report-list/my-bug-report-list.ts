import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyBugReportPage } from '../mine-bug-report/my-bug-report';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { BaseUrl, mineReport } from '..';
import { Storage } from '../../../node_modules/@ionic/storage';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private storge: Storage) {
    this.type = '1';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBugReportListPage');
    this.getData();
  }

  getToken() {
    var token;
    this.storge.get('user').then(user => {
      token = user['token']
    })
    return token;
  }

  getData() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Cache-Control', 'no-cache')
      .set('Authorization', this.getToken());
    let params = { 'type': this.type };
    let options = {
      headers: httpHeaders,
      params: params
    };

    this.http.post(BaseUrl + mineReport, null, options).subscribe(res => {
      console.log(res)
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
