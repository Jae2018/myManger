import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { StoreBugReportPage } from '../store-bug-report/store-bug-report';
import { Geolocation } from '@ionic-native/geolocation';
import { AddRepairReportPage } from '../add-repair-report/add-repair-report';
import { EquipmentListPage } from '../equipment-list/equipment-list';
import { Storage } from "@ionic/storage";
import { HttpClientModule } from "@angular/common/http";
// import { Api } from '../../providers';
import { BaseUrl, token } from '../index';
// import { Bean } from '../../models/bean';
// import { Store } from '../../models/store';
import { User } from '../../models/user';
import { Store } from '../../models/store';
import { Sms } from '../../models/sms';

/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  storeId;
  title: string;
  num: number = 0;
  public item: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController, private http: HttpClient,
    private geolocation: Geolocation, private storge: Storage, private alert: AlertController) {

  }

  ionViewDidLoad() {
    // this.storge.get('user').then((user: User) => {
    //   this.token = user.token;
    //   console.log(this.token);
    // });
    // this.getLocation();
    this.getStoreList();
  }

  // getLocation() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     // resp.coords.latitude
  //     // resp.coords.longitude
  //     console.log(resp.coords.latitude);
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }
  store: Store[];

  getStoreList() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYnl3IiwidXNlcklkIjo3Niwicm9sZUlkIjo3MSwiY29tcElkIjo5NCwiZW50VHlwZSI6IjEiLCJleHAiOjE1MzM4MDU5Mjl9.VcFx9dwfe1-NxAXtahCBd_V7fQVEYlCWq65tp3GY2cQGzGgVzjeX-XY4D6syBEUmi8U2LO-StYt4DEy0HhKoqw');

    let options = {
      headers: httpHeaders
    };

    this.http.post<Sms<Store[]>>("https://www.goodb2b.cn/sale_inte/repair/storelist.action", null, options).subscribe((res) => {
      if (res.data.length > 0) {
        this.store = res.data;
        this.title = this.store[0].storeName;
        this.num = this.store[0].deviceNo;
        console.log(this.store);
      }
    }, err => {

    });
  }

  myFunction(i) {
    if (this.store.length > 0) {
      console.log('>>>>>2')
      this.title = this.store[i].storeName;
      this.num = this.store[i].deviceNo ? this.store[i].deviceNo : 0;
    }
  }

  changeStore() {
    if (this.store.length > 0) {
      var btns = [];
      for (var i = 0; i < this.store.length; i++) {
        btns.push({
          text: this.store[i].storeName,
          handler: this.myFunction.bind(this, i)
        })
      }

      const actionSheet = this.actionSheetCtrl.create({
        title: '请选择店铺',
        // cssClass:'title',
        buttons: btns
      });
      actionSheet.present();
    } else {
      this.alert.create({
        title:'注意',
        message:'暂无店铺',
        buttons:[
          '确认'
        ]
      }).present();
    }
  }

  goEquipmentList() {
    this.navCtrl.push(EquipmentListPage);
  }

  public goRepairPage() {
    this.navCtrl.push(AddRepairReportPage);
  }

  goReportPage() {
    this.navCtrl.push(StoreBugReportPage);
  }


  goAddPage() {
    this.navCtrl.push(AddRepairReportPage);
  }

  goAuditPage() {

  }
}
