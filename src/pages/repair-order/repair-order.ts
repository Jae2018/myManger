import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from '../../../node_modules/@angular/common/http';
import { BaseUrl, personOrderDetail, qiangOrder, cancelOrder, OrderStateChange, uploadOrder } from '..';
import { Sms } from '../../models/sms';
import { MyWorker } from '../../models/worker';
import { OrderInfo } from '../../models/orderinfo';
import { Api } from '../../providers';

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
  maiId;

  showWorks: boolean = false;//显示人员
  getOrcancel: boolean = false;//抢单或取消
  startOrfinish: boolean = false;//开始维修或完成

  workerArr = [];//工作人员
  parts = [];//配件

  bugReason = "1";
  repairLevel = "1";
  descrption = "1";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private alertCtrl: AlertController,
    private api: Api,
    private toast: ToastController,
    private loadingCtrl: LoadingController) {
    this.maiId = navParams.get('maiId');
    // if (this.maiId.length == null) {
    //   this.maiId = '2';
    // }
    console.log(this.maiId);
  }

  ionViewDidLoad() {
    this.getOrderBaseInfo();
    // this.getWorkers();
  }

  commit(event) {

    let load = this.loadingCtrl.create();
    load.present();

    let header = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let params = new HttpParams()
      .set('maiId', this.maiId)
      .set('bugReason', this.bugReason)
      .set('repairLevel', this.repairLevel)
      .set('descrption', this.descrption);

    let options = {
      headers: header,
      params: params
    }

    this.http.post<Sms<any>>(BaseUrl + uploadOrder, null, options).subscribe(res => {
      // if (this.checkTokenOutDate(res.code)) {
      //   this.goLogin(navCtrl);
      //   return
      // } else {
        // }
        setTimeout(() => {
          this.showToast('提交成功');
          load.dismiss();
          this.navCtrl.pop();
      }, 2000);
    }, err => {
      this.navCtrl.pop();
      load.dismiss();
    })
  }

  showToast(msg) {
    this.toast.create({
      duration: 2000,
      message: msg,
      position: 'bottom'
    }).present();
  }

  //抢单或者取消
  cancle(event) {
    if (this.getOrcancel) {//取消
      this.http.post(BaseUrl + cancelOrder, null, this.setParams()).subscribe(res => {
        this.getOrcancel = false;

      }, err => {
        console.log(err)
      });
    } else {//抢单
      this.http.post(BaseUrl + qiangOrder, null, this.setParams()).subscribe(res => {
        this.getOrcancel = true;

      }, err => {

      });
    }
  }

  //执行中或完成
  startOfinish() {
    if (this.startOrfinish) {//完成

    } else {//开始维修，执行中
      this.http.post(BaseUrl + OrderStateChange, null, this.setParams()).subscribe(res => {
        this.getOrcancel = true;

      }, err => {

      });
    }
  }

  private setParams() {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let params = new HttpParams().set('maiId', this.maiId);

    let options = {
      headers: header,
      params: params
    };
    return options;
  }

  //维修单故障信息
  getOrderBaseInfo() {
    let load = this.loadingCtrl.create()
    load.present()
    this.http.post<Sms<any>>(BaseUrl + personOrderDetail, null, this.setParams()).subscribe((res) => {
      console.log(res);
      load.dismiss()
    }, err => {
      load.dismiss()
      console.log(err)
    });
  }

  list = [];
  //工人列表
  getWorkers() {
    // this.http.post(BaseUrl + personOrderDetail, options).subscribe((res:Sms<MyWorker[]>) => {
    //   this.showWorkerDialog(res.data);
    // }, err => {

    // });
    this.list = [{
      name: "123",
      userId: "221"
    }, {
      name: "123",
      userId: "222"
    }, {
      name: "123",
      userId: "223"
    }, {
      name: "123",
      userId: "224"
    }];
    this.showWorkerDialog();
  }

  //员工列表弹窗
  showWorkerDialog() {
    let alert = this.alertCtrl.create();
    alert.setTitle('请选择要增加的人员');

    for (var i = 0; i < this.list.length; i++) {
      alert.addInput({
        type: 'checkbox',
        label: this.list[i].name,
        value: this.list[i].userId,
        name: i
      });
    }

    alert.addButton('取消');
    alert.addButton({
      text: '确认',
      handler: data => {
        console.log('Checkbox data:', data);//value数组
        //添加人员list
        for (var i = 0; i < this.list.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if (this.list[i].userId === data[j]) {
              this.workerArr.push(
                new MyWorker(this.list[i].userId, this.list[i].username, this.list[i].name)
              );
            }
          }
        }
        this.showWorks = true;
      }
    });
    alert.present();
  }

  //配件
  getParts() {

  }

  addWorkInfo(worker) {

  }

}
