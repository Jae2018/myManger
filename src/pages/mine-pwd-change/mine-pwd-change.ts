import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from '../../../node_modules/@angular/common/http';
import { Api } from '../../providers';
import { BaseUrl, mima } from '..';

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
  pwd: any;
  newPwd: any;
  newPwdLast: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: Api,
    private toast: ToastController,
    private loading: LoadingController,
    private http: HttpClient, ) {

  }

  commit(event) {
    //this.navCtrl.pop();
    let loading = this.loading.create();
    loading.present();

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken())

    let params = new HttpParams()
      .set('pwd', this.pwd)
      .set('newPwd', this.newPwd)
    let options = {
      headers: httpHeaders,
      params: params
    }
    if (this.newPwd == this.newPwdLast) {
      this.http.post(BaseUrl + mima, null, options).subscribe((res) => {
        loading.dismiss();
        this.showToast("修改成功！");
        this.pwd = "";
        this.newPwd = "";
        this.newPwdLast = "";
        this.navCtrl.pop();
      }, err => {
        this.showToast(err["msg"]);
      });
    } else {
      this.showToast("两次输入的密码不一致！");
      loading.dismiss();
    }

  }
  showToast(msg) {
    this.toast.create({
      duration: 2000,
      message: msg,
      position: 'bottom'
    }).present();
  }
}
