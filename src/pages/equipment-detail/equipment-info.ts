import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '../../../node_modules/@ionic/storage';

/**
 * Generated class for the EquipmentInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipment-info',
  templateUrl: 'equipment-info.html',
})
export class EquipmentInfoPage {

  item = {};
  type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storge: Storage) {
    this.item = navParams.data;
    this.type = '1';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentInfoPage');

  }

}
