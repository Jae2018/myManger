import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentListPage } from '../equipment-list/equipment-list';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

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
  }

  doClick(){
    this.navCtrl.push(EquipmentListPage);
  }

  goDetail1(event, index) {
    this.navCtrl.push(EquipmentListPage);
  }

  goDetail2(event, index) {
    this.navCtrl.push(EquipmentListPage);
  }

}
