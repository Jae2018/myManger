import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from '../../../node_modules/@angular/common/http';
import { BaseUrl, personOrderDetail, qiangOrder, cancelOrder, OrderStateChange } from '..';
import { Sms } from '../../models/sms';
import { MyWorker } from '../../models/worker';
import { OrderInfo } from '../../models/orderinfo';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.maiId = navParams.get('maiId');
    if (!this.maiId) {
      this.maiId = '2';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairOrderPage');
    this.getOrderBaseInfo(this.maiId);
    this.getWorkers();
  }

  commit(event) {
    this.navCtrl.pop();
  }

  //抢单或者取消
  cancle(event) {
    if (this.getOrcancel) {//取消
      this.http.post(BaseUrl + cancelOrder, null, this.setParams(this.maiId)).subscribe(res => {
        this.getOrcancel = false;

      }, err => {

      });
    } else {//抢单
      this.http.post(BaseUrl + qiangOrder, null, this.setParams(this.maiId)).subscribe(res => {
        this.getOrcancel = true;

      }, err => {

      });
    }
  }

  //执行中或完成
  startOfinish() {
    if(this.startOrfinish){//完成

    }else{//开始维修，执行中
      this.http.post(BaseUrl + OrderStateChange, null, this.setParams(this.maiId)).subscribe(res => {
        this.getOrcancel = true;

      }, err => {

      });
    }
  }

  private setHeader() {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYnl3IiwidXNlcklkIjo3Niwicm9sZUlkIjo3MSwiY29tcElkIjo5NCwiZW50VHlwZSI6IjEiLCJleHAiOjE1MzM4MDU5Mjl9.VcFx9dwfe1-NxAXtahCBd_V7fQVEYlCWq65tp3GY2cQGzGgVzjeX-XY4D6syBEUmi8U2LO-StYt4DEy0HhKoqw');
    return header;
  }

  private setParams(maiId) {
    let params = new HttpParams();
    if(maiId){
      params.set('maiId', maiId);
    }
    params.set('','');
    let options = {
      headers: this.setHeader(),
      params: params
    };
    return options;
  }

  //维修单故障信息
  getOrderBaseInfo(maiId) {
    this.http.post(BaseUrl + personOrderDetail, null, this.setParams(maiId)).subscribe((res: Sms<OrderInfo[]>) => {


    }, err => {

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
    // this.showWorkerDialog(list);
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
