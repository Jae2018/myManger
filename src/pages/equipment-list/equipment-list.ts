import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentInfoPage } from '../equipment-detail/equipment-info';

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
export class EquipmentListPage implements OnInit {

  public list = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentListPage');
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    for (let i = 0; i < 5; i++) {
      this.list.push({
        title: "title" + i,
        id: "id" + i,
        no: (i + 1) % 3,
        catogery: "store",
        left: (300 + i) % 4,
        factory:"测试场"+i,

      });
    }
  }

  doClick(event,index) {
    console.log("equipment");
    this.navParams = this.list[index];
    this.navCtrl.push(EquipmentInfoPage, this.navParams);
  }
}
