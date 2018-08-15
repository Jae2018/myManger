import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers';

/**
 * Generated class for the MinePwdChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine-pwd-change',
  templateUrl: 'mine-pwd-change.html',
})
export class MinePwdChangePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: Api) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePwdChangePage');
  }

  commit(event) {
    this.navCtrl.pop();
  }

}
