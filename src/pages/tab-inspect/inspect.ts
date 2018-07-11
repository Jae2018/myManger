import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentListPage } from '../equipment-list/equipment-list';

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
export class InspectPage implements OnInit {

  public list = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }

  ngOnInit() {
    this.list.push(
      {
        title: "巡检测试计划1",
        date: "2018-08-15",
        time: "12:10:12",
        state: "1天前"
      },
      {
        title: "巡检测试计划2",
        date: "2018-08-15",
        time: "12:12:32",
        state: "1天前"
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectPage');
  }

  goDetail(event, index) {
    this.navParams = index;
    this.navCtrl.push(EquipmentListPage, this.navParams);
  }
}
