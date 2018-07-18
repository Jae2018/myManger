import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddRepairReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-repair-report',
  templateUrl: 'add-repair-report.html',
})
export class AddRepairReportPage {

  tab: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.tab = "1";
    console.log('ionViewDidLoad AddRepairReportPage');
  }

}
