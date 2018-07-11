import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform} from 'ionic-angular';

/**
 * Generated class for the RepairOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repair-order',
  templateUrl: 'repair-order.html',
})
export class RepairOrderPage {

  type = "1";
  pet: string = "puppies";
  isAndroid: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public cf: ChangeDetectorRef,platform: Platform ) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairOrderPage');
  }

  commit(event){
    this.navCtrl.pop();
  }

  cancle(event){

  }

  segmentChanged()
  {
    this.cf.detectChanges();
  }

}
