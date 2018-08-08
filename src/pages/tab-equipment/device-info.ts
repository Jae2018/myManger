import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentListPage } from '../equipment-list/equipment-list';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { BaseUrl, parstList } from '..';

/**
 * Generated class for the DeviceInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-info',
  templateUrl: 'device-info.html',
})
export class DeviceInfoPage implements OnInit {

  items = [];
  num: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient) {

  }

  ngOnInit() {
    this.items.push({
      title1: "1",
      title2: "2",
    }, {
        title1: "1",
        title2: "2",
      }, {
        title1: "1",
        title2: "2",
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceInfoPage');
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYnl3IiwidXNlcklkIjo3Niwicm9sZUlkIjo3MSwiY29tcElkIjo5NCwiZW50VHlwZSI6IjEiLCJleHAiOjE1MzM4MDU5Mjl9.VcFx9dwfe1-NxAXtahCBd_V7fQVEYlCWq65tp3GY2cQGzGgVzjeX-XY4D6syBEUmi8U2LO-StYt4DEy0HhKoqw');
    let params = { 'pinpaiID': '88' }
    let options = {
      headers: httpHeaders,
      params: params
    };
    this.http.post(BaseUrl + parstList, options).subscribe(res => {
      console.log(res)
    }, err => {

    })
  }

  doClick() {
    this.navCtrl.push(EquipmentListPage);
  }

  goDetail1(event, index) {
    this.navCtrl.push(EquipmentListPage);
  }

  goDetail2(event, index) {
    this.navCtrl.push(EquipmentListPage);
  }

}
