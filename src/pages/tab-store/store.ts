import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { StoreBugReportPage } from '../store-bug-report/store-bug-report';
// import { Geolocation } from '@ionic-native/geolocation';
import { AddRepairReportPage } from '../add-repair-report/add-repair-report';
import { EquipmentListPage } from '../equipment-list/equipment-list';
import { BaseUrl, storeList } from '../index';
import { Store } from '../../models/store';
import { Sms } from '../../models/sms';
import { Api } from '../../providers';

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
  store: Store[];
  title: string;
  num: number = 0;
  public item: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    private api: Api,
    private alert: AlertController) {

  }

  ionViewDidLoad() {
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

  getStoreList() {
    let loading = this.loadingCtrl.create();
    loading.present();

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let options = {
      headers: httpHeaders
    };

    this.http.post<Sms<Store[]>>(BaseUrl + storeList, null, options).subscribe((res) => {
      if (res.data.length > 0) {
        this.store = res.data;
        this.title = this.store[0].storeName;
        this.num = this.store[0].deviceNo;
        this.storeId = this.store[0].shopId;
        loading.dismiss()
      }
    }, err => {

    });
  }

  myFunction(i) {
    if (this.store.length > 0) {
      this.title = this.store[i].storeName;
      this.num = this.store[i].deviceNo ? this.store[i].deviceNo : 0;
      this.storeId = this.store[i].shopId;
    }
  }

  changeStore() {
    if (this.store.length > 0) {
      var btns = [];
      for (var i = 0; i < this.store.length; i++) {
        btns.push({
          text: this.store[i].storeName,
          handler: this.myFunction.bind(this, i)//注意bind方法
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
        title: '注意',
        message: '暂无店铺',
        buttons: [
          '确认'
        ]
      }).present();
    }
  }

  goEquipmentList() {
    this.navParams.data = { storeId: this.storeId };
    console.log('store page ==>'+this.storeId)
    this.navCtrl.push(EquipmentListPage, this.navParams);
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
