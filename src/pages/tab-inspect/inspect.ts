import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentListPage } from '../equipment-list/equipment-list';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { BaseUrl, inspect } from '..';
// import { Storage } from '../../../node_modules/@ionic/storage';
import { Api } from '../../providers';

/**
 * Generated class for the InspectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inspect',
  templateUrl: 'inspect.html',
})
export class InspectPage {

  public list = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    // private storge: Storage,
    private api: Api) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectPage');
    this.getData();
  }

  getData() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let options = {
      headers: httpHeaders,
    };

    this.http.post(BaseUrl + inspect, null, options).subscribe(res => {
      console.log(res)
    }, err => {

    })
  }

  goDetail(event, index) {
    this.navParams = index;
    this.navCtrl.push(EquipmentListPage, this.navParams);
  }
}
