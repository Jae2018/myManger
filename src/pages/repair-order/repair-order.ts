import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from '../../../node_modules/@angular/common/http';
import { BaseUrl, personOrderDetail, qiangOrder, cancelOrder, OrderStateChange, uploadOrder, workerList, pushWorkers, partsArr,myOrderHostery,atartOrder } from '..';
import { Sms } from '../../models/sms';
import { MyWorker } from '../../models/worker';
import { MyParts } from '../../models/parts';
import { OrderInfo } from '../../models/orderinfo';
import { PeijianDetailPage } from '../peijian-detail/peijian-detail';
import { Api } from '../../providers';
import { NgSwitchCase } from '@angular/common';

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
  date: any;
  type = "1";
  maiId;
  getOrderDetail = [];
  repair = '请选择';
  showWorks: boolean = false;//显示人员
  showParts: boolean = false;//显示备件
  getOrcancel: boolean = false;//抢单或取消
  startOrfinish: boolean = false;//开始维修或完成
  Classification: any;//故障类别
  faultLevel = '请选择';//故障等级
  workerArr: MyWorker[] = [];//工作人员
  partsArr: MyParts[] = [];//配件
  parts = [];//配件
  time: string = "";
  bugReason: any;
  repairLevel: any;
  descrption: any;
  msg: any;
  state = "1";
  timeLsst: any;
  nowData: any;
  dieTime: any;
  finally: any;
  dayDiff: any;
  hoursUse: any;
  code: any;
  username: any;
  userId: any;
  userIdStr = [];

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
  }

  ionViewDidLoad() {//equivalence to $(document).ready(function(){})
    this.getOrderBaseInfo();
    this.myordersHostery();
  }
  nowDayTime() {
    this.date = new Date();
    this.nowData = new Date();;
    this.time = this.date.toLocaleDateString() + " " + (this.date.getHours() < 10 ? "0" + this.date.getHours() : this.date.getHours())
      + ":" + (this.date.getMinutes() < 10 ? "0" + this.date.getMinutes() : this.date.getMinutes())
      + ":" + (this.date.getSeconds() < 10 ? "0" + this.date.getSeconds() : this.date.getSeconds());
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
      .set('repairLevel', this.faultLevel)
      .set('descrption', this.descrption);

    let options = {
      headers: header,
      params: params
    }

    this.http.post<Sms<any>>(BaseUrl + uploadOrder, null, options).subscribe(res => {

      setTimeout(() => {
        this.showToast('提交成功');
        load.dismiss();
        //this.navCtrl.pop();//返回上一级
      }, 1500);
    }, err => {
      //this.navCtrl.pop();
      load.dismiss();
    })
  }

  showToast(msg) {
    this.toast.create({
      duration: 1500,
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

        if (res['code'] == 1202) {
          this.showToast(res['msg']);
        } else {

        }
        console.log(res);

      }, err => {

      });
    }
  }

  // starOrStopOrFinish() {
  //   if (this.stateOrder !== "4") {//待维修
  //     document.getElementById("startOrderCharge").innerHTML = "完成";
  //     this.startOrder();
  //   } else {//维修中
  //     this.finishOrders()
  //   }

  // }
  // startOrder() {//开始维修
  //   let header = new HttpHeaders()
  //     .set('Content-Type', 'application/x-www-form-urlencoded')
  //     .set('Authorization', this.api.getToken());

  //   let params = new HttpParams()
  //     .set('maiId', this.maiId)
  //     .set('state', "1");

  //   let options = {
  //     headers: header,
  //     params: params
  //   };
  //   this.http.post(BaseUrl + OrderStateChange, null, options).subscribe(res => {
  //     //this.nowDayTime();
  //     this.getOrderBaseInfo();//设备保修信息
  //     setTimeout(() => {
  //       this.showToast('维修已开始');
  //     }, 1500);
  //     console.log("维修已开始");
  //   }, err => {
  //     alert(this.msg);
  //   });
  // }
  // finishOrders() {//维修完成
  //   let header = new HttpHeaders()
  //     .set('Content-Type', 'application/x-www-form-urlencoded')
  //     .set('Authorization', this.api.getToken());

  //   let params = new HttpParams()
  //     .set('maiId', this.maiId)
  //     .set('state', "2");

  //   let options = {
  //     headers: header,
  //     params: params
  //   };
  //   this.http.post(BaseUrl + OrderStateChange, null, options).subscribe(res => {
  //     this.nowDayTime();
  //     this.getOrderBaseInfo();//设备保修信息
  //     setTimeout(() => {
  //       this.showToast('维修已完成');
  //     }, 1500);
  //     console.log("维修已完成");
  //   }, err => {
  //     alert(this.msg);
  //   });
  // }
  // stopOrders() {//暂停维修
  //   let header = new HttpHeaders()
  //     .set('Content-Type', 'application/x-www-form-urlencoded')
  //     .set('Authorization', this.api.getToken());

  //   let params = new HttpParams()
  //     .set('maiId', this.maiId)
  //     .set('state', "3");

  //   let options = {
  //     headers: header,
  //     params: params
  //   };
  //   this.http.post(BaseUrl + OrderStateChange, null, options).subscribe(res => {
  //     this.nowDayTime();
  //     this.getOrderBaseInfo();//设备保修信息
  //     setTimeout(() => {
  //       this.showToast('维修已暂停');
  //     }, 1500);
  //     console.log("维修已暂停");
  //   }, err => {
  //     alert(this.msg);
  //   });
  // }



  //执行中或完成
  // startOfinish() {
  //   if (this.startOrfinish) {//完成

  //     this.http.post(BaseUrl + OrderStateChange, null, this.setParams()).subscribe(res => {
  //       console.log(res['msg']);          
  //     }, err => {
  //       alert(this.msg);
  //     });
  //   } else {//开始维修，执行中
  //     this.http.post(BaseUrl + OrderStateChange, null, this.setParams()).subscribe(res => {
  //       this.getOrcancel = true;
  //       this.startOrfinish=true;
  //       this.nowDayTime();
  //       this.state="2";
  //       this.getOrderBaseInfo();//设备保修信息
  //     }, err => {
  //       alert(this.msg);
  //     });
  //   }
  // }

  private setParams() {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let params = new HttpParams()
      .set('maiId', this.maiId)
      .set('state', this.state);

    let options = {
      headers: header,
      params: params
    };
    return options;
  }

  stateOrder: any;


  //维修单故障信息
  getOrderBaseInfo() {
    let load = this.loadingCtrl.create()
    load.present()
    console.log(this.maiId);
    this.http.post<Sms<any>>(BaseUrl + personOrderDetail, null, this.setParams()).subscribe((res) => {
      this.getOrderDetail = res.data
      this.code = res.code;
      this.stateOrder = res.data.maiStatus
      console.log(res);
      console.log(this.getOrderDetail);
      console.log(this.code);
      load.dismiss()

    }, err => {
      load.dismiss()
      console.log(err)
    });
  }

  //维修状态选择
  repairStatus(event) {
    let a1 = this.alertCtrl.create();
    a1.setTitle('维修状态');
    a1.setMode('ios');
    a1.addInput({
      type: 'radio',
      label: '待维修',//3-待维修
      value: '待维修',
      handler: data => {
        this.repair = data.value;
        a1.dismiss();
      }
    });

    a1.addInput({
      type: 'radio',
      label: '维修中',//4-ing
      value: '维修中',
      handler: data => {
        this.repair = data.value;
        a1.dismiss();
      }
    });

    a1.addInput({
      type: 'radio',
      label: '完成维修',//5-结束
      value: '完成维修',
      handler: data => {
        this.repair = data.value;
        a1.dismiss();
      }
    });

    a1.present();
  }
  //故障类别
  repairfaultClassification(event) {
    let a1 = this.alertCtrl.create();
    a1.setTitle('故障类别');
    a1.setMode('ios');
    a1.addInput({
      type: 'radio',
      label: '待维修',//3-待维修
      value: '待维修',
      handler: data => {
        this.Classification = data.value;
        a1.dismiss();
      }
    });

    a1.addInput({
      type: 'radio',
      label: '维修中',//4-ing
      value: '维修中',
      handler: data => {
        this.Classification = data.value;
        a1.dismiss();
      }
    });

    a1.addInput({
      type: 'radio',
      label: '完成维修',//5-结束
      value: '完成维修',
      handler: data => {
        this.Classification = data.value;
        a1.dismiss();
      }
    });

    a1.present();
  }
  //故障等级
  repairFaultLevel(event) {
    let a1 = this.alertCtrl.create();
    a1.setTitle('维修等级');
    a1.setMode('ios');
    a1.addInput({
      type: 'radio',
      label: '轻微故障',//1-轻微故障
      value: '轻微故障',
      handler: data => {
        this.faultLevel = data.value;
        a1.dismiss();
      }
    });

    a1.addInput({
      type: 'radio',
      label: '一般故障',//2-一般故障
      value: '一般故障',
      handler: data => {
        this.faultLevel = data.value;
        a1.dismiss();
      }
    });

    a1.addInput({
      type: 'radio',
      label: '严重故障',//3-严重故障
      value: '严重故障',
      handler: data => {
        this.faultLevel = data.value;
        a1.dismiss();
      }
    });

    a1.present();
  }
  list = [];
  //工人列表
  getWorkers() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let params = { maiId: this.maiId }

    let options = {
      headers: httpHeaders,
      params: params
    };
    this.http.post(BaseUrl + workerList, null, options).subscribe((res) => {
      this.list = res['data']
      console.log(res)
      console.log(res['data'])
      this.showWorkerDialog();

    }, err => {

    });

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
        if (data !== "") {
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
        } else {

        }
        console.log(this.workerArr)
      }
    });
    alert.present();
  }
  //删除准备添加的人员
  deleteWorkers(i) {
    console.log(i)
    this.workerArr.splice(i, 1)
  }
  userIdStree: string;
  //添加所选中的人员
  pushWorkers() {
    for (let i of this.workerArr) {
      this.userIdStr.push(i.userId)
      this.userIdStree = (this.userIdStr.join(","));
    }
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());
    let params = new HttpParams()
      .set('maiId', this.maiId)
      .set('userIdStr', this.userIdStree);
    let options = {
      headers: httpHeaders,
      params: params
    };
    console.log(this.maiId)
    console.log(this.userIdStree)
    this.http.post(BaseUrl + pushWorkers, null, options).subscribe((res) => {

      setTimeout(() => {
        this.showToast('已添加');
      }, 1500);

    }, err => {
      setTimeout(() => {
        this.showToast(err["mag"]);
      }, 1500);
    });
  }
  //配件
  getParts() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let params = { maiId: this.maiId }

    let options = {
      headers: httpHeaders,
      params: params
    };
    this.http.post(BaseUrl + partsArr, null, options).subscribe((res) => {
      this.list = res['data']
      console.log(res)
      console.log(res['data'])
      this.showPartsDialog();
    }, err => {

    });
  }
  //配件列表弹窗
  showPartsDialog() {
    let alert = this.alertCtrl.create();
    alert.setTitle('请选择要使用的备件');

    for (var i = 0; i < this.list.length; i++) {
      alert.addInput({
        type: 'checkbox',
        label: this.list[i].partName,
        value: this.list[i].sparePartId,
        name: i
      });
    }

    alert.addButton('取消');
    alert.addButton({
      text: '确认',
      handler: data => {
        console.log('Checkbox data:', data);//value数组
        //添加人员list
        if (data !== "") {
          for (var i = 0; i < this.list.length; i++) {
            for (var j = 0; j < data.length; j++) {
              if (this.list[i].sparePartId === data[j]) {
                this.partsArr.push(
                  new MyParts(this.list[i].sparePartId, this.list[i].unitName, this.list[i].unitId, this.list[i].partName, this.list[i].partNo)
                );
              }
            }
          }
          this.showParts = true;
        } else {

        }
      }
    });
    alert.present();
  }
  
//我的维修记录
  orders=[];
  myordersHostery(){
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let params = { maiId: this.maiId }

    let options = {
      headers: httpHeaders,
      params: params
    };
    this.http.post(BaseUrl + myOrderHostery, null, options).subscribe((res) => {
      this.orders = res['data']
      console.log(res)
      console.log(res['data'])
    }, err => {

    });
  }
  
  startOder() {//开始维修
    let header = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let params = new HttpParams()
      .set('maiId', this.maiId)

    let options = {
      headers: header,
      params: params
    };
    this.http.post(BaseUrl + atartOrder, null, options).subscribe(res => {
      //this.nowDayTime();
      this.myordersHostery();//我的维修单
      setTimeout(() => {
        this.showToast('维修已开始');
      }, 1500);
      console.log("维修已开始");
    }, err => {
      setTimeout(() => {
        this.showToast(err.msg);
      }, 1500);;
    });
  }
  goDetail(i) {
    this.navParams.data = { maiId: this.maiId,mainHisId:this.orders[i].id };
    this.navCtrl.push(PeijianDetailPage, this.navParams);
  }
}
