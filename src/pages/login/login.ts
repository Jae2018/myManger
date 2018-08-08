import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, Platform } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage, BaseUrl } from '../';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Device } from '@ionic-native/device';

import { Sms } from '../../models/sms';
// import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the tel field with or without email, make
  // sure to add it to the type
  account: { tel: string, password: string, token: string } = {
    tel: '',
    password: '',
    token: ''
  };
  sms: Sms<any>;
  img: any;
  checkCode: string;
  uuid;
  backButtonPressed: boolean = false;
  // Our translated text strings
  // private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public device: Device,
    private platform: Platform,
    private storge: Storage) {

      this.platform.registerBackButtonAction(()=>{
        this.showExit();
      });
  }

  ionViewDidLoad() {
    this.uuid = this.device.uuid;
    this.getSms();
    this.getAccount();
  }

  private getAccount() {
    this.storge.get('user').then((user) => {
      console.log(user);
      this.account = user;
    });
  }

  getSms() {
    let httpParams = new HttpParams().set("machineCode", this.uuid);
    this.http.post(BaseUrl + 'system/checkcode.action', httpParams).subscribe((res: Sms<any>) => {
      this.img = res.data;
    }, err => {

    });
  }

  refreshCode() {
    this.getSms();
  }

  // Attempt to login in through our User service
  doLogin() {
    // if (this.account.tel.length == 0 || this.account.password.length == 0) {
    //   this.toastCtrl.create()
    // }
    let currentIndex = this.navCtrl.getActive().index;

    let httpParams = new HttpParams()
      .set("machineCode", this.uuid)
      .set("userCode", this.account.tel)
      .set("password", this.account.password)
      .set("checkCode", this.checkCode)
      .set("source", this.device.platform);
    this.http.post(BaseUrl + 'system/logon.action', httpParams).subscribe((res: Sms<any>) => {
      if (res.code == 0) {
        this.account.token = res.data;
        this.storge.set('user', this.account);
        this.navCtrl.push(MainPage).then(() => {
          this.navCtrl.remove(currentIndex);
        });
      } else if (res.code == 1231) {
        // this.http.showToast('验证码错误');
        this.toastCtrl.create({
          message: '验证码错误',
          duration: 2000,
          position: 'bottom'
        }).present();
        console.log(res.msg)
      }
    }, err => {
      // this.http.handleError(err);
      console.log(err)
    })

  }

  //退出应用方法
  private showExit(): void {
    //如果为true，退出
    if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
      //第一次按，弹出Toast
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'bottom'
      }).present();
      //标记为true
      this.backButtonPressed = true;
      //两秒后标记为false，如果退出的话，就不会执行了
      setTimeout(() => this.backButtonPressed = false, 2000);
    }
  }
}
