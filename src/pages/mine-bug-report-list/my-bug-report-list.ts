import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyBugReportPage } from '../mine-bug-report/my-bug-report';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { BaseUrl, mineReport } from '..';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.type = '1';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBugReportListPage');
    this.getData();
  }

  getData() {
    let httpHeaders = new HttpHeaders()
      // .set('Content-Type', 'application/json')
      // .set('Cache-Control', 'no-cache')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYnl3IiwidXNlcklkIjo3Niwicm9sZUlkIjo3MSwiY29tcElkIjo5NCwiZW50VHlwZSI6IjEiLCJleHAiOjE1MzM4MDU5Mjl9.VcFx9dwfe1-NxAXtahCBd_V7fQVEYlCWq65tp3GY2cQGzGgVzjeX-XY4D6syBEUmi8U2LO-StYt4DEy0HhKoqw');
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
