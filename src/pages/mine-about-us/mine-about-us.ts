import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the MineAboutUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine-about-us',
  templateUrl: 'mine-about-us.html',
})
export class MineAboutUsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MineAboutUsPage');
  }

  call(event) {
    this.callNumber.callNumber("18001010101", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
