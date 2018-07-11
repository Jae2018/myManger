import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RepairReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repair-report',
  templateUrl: 'repair-report.html',
})
export class RepairReportPage {

  public list = [];
  show: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairReportPage');
  }

  commit() {

  }

  chooseDevice() {

  }

  chooseTime() {

  }

}
