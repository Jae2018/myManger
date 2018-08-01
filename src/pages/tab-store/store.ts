import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { StoreBugReportPage } from '../store-bug-report/store-bug-report';
import { Geolocation } from '@ionic-native/geolocation';
import { AddRepairReportPage } from '../add-repair-report/add-repair-report';
import { EquipmentListPage } from '../equipment-list/equipment-list';

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
  num: number;
  public item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController, private http: HttpClient,
    private geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    this.title = "测试";
    this.num = 3;
    console.log('ionViewDidLoad StorePage');
    this.item = {
      title: "测试",
      num: 3,
    }

    this.getLocation();
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  getStoreList() {
    // this.http.jsonp("",)
  }

  location(event) {
    const actionSheet = this.actionSheetCtrl.create({
      title: '请选择店铺',
      // cssClass:'title',
      buttons: [
        {
          text: '分区1店',
          handler: () => {
            this.title = "分区1店";
          }
        }, {
          text: '分区2店',
          handler: () => {
            this.title = "分区2店";
          }
        }
      ]
    });
    actionSheet.present();
  }

  goEquipmentList(event) {
    this.navCtrl.push(EquipmentListPage);
  }

  goReportPage(event) {
    this.navCtrl.push(StoreBugReportPage);
  }


  goAddPage() {
    this.navCtrl.push(AddRepairReportPage);
  }

}
