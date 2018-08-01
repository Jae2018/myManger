import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Device } from '@ionic-native/device';

import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Sms } from '../../models/sms';

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
    tel: '',
    password: ''
  };
  sms:Sms;
  img:any;

  // Our translated text strings
  // private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public device: Device,
    private sanitizer: DomSanitizer,
    private storge: Storage) {

  }

  ionViewDidLoad() {
    // this.storge.set('user',123);
    this.device.uuid = 'sda';
    this.getSms();
  }

  getSms() {
    let httpParams = new HttpParams().set("machineCode", this.device.uuid);
    this.http.post('https://www.goodb2b.cn/sale_inte/system/checkcode.action', httpParams).subscribe((res:Sms) => {

      this.sms = res;
      console.log(this.sms.data);
      this.img = this.sms.data;
    }, err => {

    });

  }

  // Attempt to login in through our User service
  doLogin() {
    if (this.account.tel.length == 0 || this.account.password.length == 0) {
      this.toastCtrl.create()
    }
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(MainPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });

    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: '用户名或密码错误',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    });

  }

}
