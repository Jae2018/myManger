import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { RepairOrderPage } from '../repair-order/repair-order';
import { HttpClient } from '../../../node_modules/@angular/common/http';

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
export class StorePage implements OnInit {

  storeId;
  title: string;
  num: number;
  public item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController, private http: HttpClient) {

  }

  ngOnInit() {
    this.title = "测试";
    this.num = 3;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorePage');
    this.item = {
      title: "测试",
      num: 3,
    }
  }

  goOrder(event) {
    this.navCtrl.push(RepairOrderPage);
  }

  getStoreList() {
    // this.http.jsonp("",)
  }

  location(event) {
    const actionSheet = this.actionSheetCtrl.create({
      title: '请选择店铺',
      buttons: [
        {
          text: '分区1店',
          handler: () => {
            this.title="分区1店";
          }
        }, {
          text: '分区2店',
          handler: () => {
            this.title="分区2店";
          }
        }
      ]
    });
    actionSheet.present();
  }

}
