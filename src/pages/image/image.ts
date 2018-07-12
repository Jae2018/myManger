import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image',
  templateUrl: 'image.html',
})
export class ImagePage {

  list = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagePage');
    this.list.push(
      {
        pic:"http://img3.imgtn.bdimg.com/it/u=640274354,3535675567&fm=27&gp=0.jpg",
        tiem:"2018-07-12",
      },
      {
        pic:"http://up.enterdesk.com/edpic_source/37/0a/ce/370ace8df53227a204d64c76ebad4620.jpg",
        time:"2018-7-13"
      },
      {
        pic:"http://up.enterdesk.com/edpic_source/c6/08/b9/c608b93a685af8e8d3dac2aac7f12b02.jpg",
        time:"2018-7-14"
      }
    )
  }

}
