import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentListPage } from '../equipment-list/equipment-list';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { BaseUrl, parstList } from '..';
import { Api } from '../../providers';

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
export class DeviceInfoPage {

  items = [];
  num: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private api: Api) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceInfoPage');
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let params = { 'pinpaiID': '88' }

    let options = {
      headers: httpHeaders,
      params: params
    };

    this.http.post(BaseUrl + parstList, null, options).subscribe(res => {
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
