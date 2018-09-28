import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from '../../../node_modules/@angular/common/http';
import { BaseUrl, personOrderDetail, qiangOrder, cancelOrder, OrderStateChange, uploadOrder, workerList, pushWorkers, partsArr, overOrder } from '..';
import { MyParts } from '../../models/parts';
import { Api } from '../../providers';


/**
 * Generated class for the PeijianDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-peijian-detail',
  templateUrl: 'peijian-detail.html',
})
export class PeijianDetailPage {
  maiId;
  maiHisId;
  list: MyParts[] = [];
  partsArr: MyParts[] = [];//配件

  showParts: boolean = false;//显示备件
  type = "1";
  datas: any;
  times: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private alertCtrl: AlertController, private api: Api, private toast: ToastController) {
    this.maiId = navParams.get('maiId');
    this.maiHisId = navParams.get('mainHisId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeijianDetailPage');
    this.getParts()
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
      
    }, err => {

    });
  }

  data:number[]=[];

addParts(){

  
  if(this.data!==null&&this.data.length>0){
    for (var k=0;k<this.data.length;k++){
      console.log("k in for",this.data[k])
      this.list.splice(this.data[k] -1)
      console.log("this.list in for : ",this.list)
    }
  }
  
  this.showPartsDialog();
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
      handler: (data:number[]) => {
        console.log('Checkbox data:', data);//value数组
        // this.list[data].sparePartId;

        this.data = data;

       
        for (var k=0;k<data.length;k++){
          // console.log(data[k]-1);
          // for (var j = 0; j < this.list.length; j++) {
            // if (this.list[j].sparePartId === data[k]) {

              let part = new MyParts(this.list[data[k]-1].sparePartId, this.list[data[k]-1].unitName, this.list[data[k]-1].unitId, this.list[data[k]-1].partName, this.list[data[k]-1].partNo);
              this.partsArr.push(part)
            
            // console.log("in for :",this.list)

            // }
          // }
         
          // console.log("in for :",this.list[data[k]-1])
          // let part = new MyParts(this.list[data[k]-1].sparePartId, this.list[data[k]-1].unitName, this.list[data[k]-1].unitId, this.list[data[k]-1].partName, this.list[data[k]-1].partNo);
          // this.partsArr.push(part)
          // this.list.splice(data[k]-1 ,1)
        }

        // setTimeout(handler=>{

        // },300)
        
        //this.list.splice(k ,1)

          // let part:MyParts = this.list[data];
          //console.log("in for :",this.list[data-1])
          // let part = new MyParts(this.list[data-1].sparePartId, this.list[data-1].unitName, this.list[data-1].unitId, this.list[data-1].partName, this.list[data-1].partNo);
          // this.partsArr.push(part)
          // this.list.splice(data-1 ,1)
          /*
          this.list[data]= MyParts();
          
          */
        //添加人员list

          // for (var i = 0; i < this.list.length; i++) {
          //   for (var j = 0; j < data.length; j++) {
          //     if (this.list[i].sparePartId === data[j]) {
          //       this.partsArr.push(
                  
          //       );
          //     }
          //   }
          // }
          this.showParts = true;
        
          // console.log('partsArr data:',this.partsArr)
      }
    });

    alert.present();
  }

getTotal(i){
  let num = 4;
  this.partsArr[i].number=num;
  
  console.log(this.partsArr[i]);
}

  //删除准备添加的备件
  deletePeijians(i) {
    console.log(i)
    this.partsArr.splice(i, 1)
    this.data.splice(i)
    let part = new MyParts(this.partsArr[i-1].sparePartId, this.partsArr[i-1].unitName, this.partsArr[i-1].unitId, this.partsArr[i-1].partName, this.partsArr[i-1].partNo);
    this.list.push(part)
  }
  //提交备件
  spares = [];
  pushBeijian() {

  }

  //结束维修
  overOder() {

    console.log(this.datas);
    console.log(this.times); 
    this.times = this.datas +" "+ this.times;
    console.log("时间参数"+this.times);
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken());

    let params = { 'maiHisId': this.maiHisId, 'endTime': this.times }

    let options = {
      headers: httpHeaders,
      params: params
    };
    this.http.post(BaseUrl + overOrder, null, options).subscribe((res) => {
      setTimeout(() => {
        this.showToast('已结束维修');
      }, 1500);
    }, err => {
      setTimeout(() => {
        this.showToast(err);
        console.log(err);
      }, 1500);
    });
  }


  showToast(msg) {
    this.toast.create({
      duration: 1500,
      message: msg,
      position: 'bottom'
    }).present();
  }
}
