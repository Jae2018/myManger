import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the tel field with or without email, make
  // sure to add it to the type
  account: { tel: string, password: string } = {
    tel: '123',
    password: '123'
  };

  // Our translated text strings
  // private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    private storge: Storage) {



  }

  ionViewDidLoad(){
    this.storge.set('user',123);
  }

  // Attempt to login in through our User service
  doLogin() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(MainPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
    // this.navCtrl.push(MainPage);
  }

}
