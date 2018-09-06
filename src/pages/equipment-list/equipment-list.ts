import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentInfoPage } from '../equipment-detail/equipment-info';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { BaseUrl, storeDeviceList } from '..';
import { Api } from '../../providers';

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
  id;
  store;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private api: Api) {
    this.id = navParams.get('storeId');
    this.store = navParams.get('store');
    console.log(this.id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentListPage');
    this.getData();
  }

  getData() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());
    let params = { 'storeId': this.id }
    let options = {
      headers: httpHeaders,
      params: params
    };
    this.http.post(BaseUrl + storeDeviceList, null, options).subscribe((res) => {
      console.log(res)
      this.list = res['data']
    }, err => {
      console.log(err)
    })

  }

  doClick(event, index) {
    console.log("equipment");
    // this.navParams = this.list[index];
    this.navCtrl.push(EquipmentInfoPage, { data: this.list[index] });
  }
}
