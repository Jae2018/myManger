import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentInfoPage');
  }

}
