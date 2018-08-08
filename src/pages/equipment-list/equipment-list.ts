import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentInfoPage } from '../equipment-detail/equipment-info';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { BaseUrl } from '..';

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
    private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentListPage');
    this.getData();
  }


  getData() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYnl3IiwidXNlcklkIjo3Niwicm9sZUlkIjo3MSwiY29tcElkIjo5NCwiZW50VHlwZSI6IjEiLCJleHAiOjE1MzM4MDU5Mjl9.VcFx9dwfe1-NxAXtahCBd_V7fQVEYlCWq65tp3GY2cQGzGgVzjeX-XY4D6syBEUmi8U2LO-StYt4DEy0HhKoqw');
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
