import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { BaseUrl, mineRepair } from '..';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MineRepairHistoryPage');
    this.getData();
  }

  getData() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYnl3IiwidXNlcklkIjo3Niwicm9sZUlkIjo3MSwiY29tcElkIjo5NCwiZW50VHlwZSI6IjEiLCJleHAiOjE1MzM4MDU5Mjl9.VcFx9dwfe1-NxAXtahCBd_V7fQVEYlCWq65tp3GY2cQGzGgVzjeX-XY4D6syBEUmi8U2LO-StYt4DEy0HhKoqw');
    // let params = { 'pinpaiID': '88' }
    let options = {
      headers: httpHeaders,
      // params: params
    };
    this.http.post(BaseUrl + mineRepair, options).subscribe(res => {
      console.log(res)
    }, err => {

    })
  }
}
