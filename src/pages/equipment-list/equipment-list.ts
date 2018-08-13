import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentInfoPage } from '../equipment-detail/equipment-info';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { BaseUrl } from '..';
import { Storage } from '../../../node_modules/@ionic/storage';

/**
 * Generated class for the EquipmentListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipment-list',
  templateUrl: 'equipment-list.html',
})
export class EquipmentListPage {

  public list = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private storge: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentListPage');
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
    let params = { 'storeId': '11' }
    let options = {
      headers: httpHeaders,
      params: params
    };
    this.http.post(BaseUrl + '/repair/deviceList.action', null, options).subscribe((res) => {
      console.log(res)
    }, err => {

    })

  }

  doClick(event, index) {
    console.log("equipment");
    this.navParams = this.list[index];
    this.navCtrl.push(EquipmentInfoPage, this.navParams);
  }
}
