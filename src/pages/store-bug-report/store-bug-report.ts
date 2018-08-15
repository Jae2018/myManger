import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { TakePhotoPage } from '../take-photo/take-photo';
import { ScanPage } from '../scan/scan';
import { HttpClient, HttpHeaders, HttpParams } from '../../../node_modules/@angular/common/http';
import { BaseUrl, storeReport } from '..';
import { Api } from '../../providers';

/**
 * Generated class for the StoreBugReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store-bug-report',
  templateUrl: 'store-bug-report.html',
})
export class StoreBugReportPage {

  item = {};
  size: number = 0;
  des: string = "123";
  level: string = "1";
  type: string = "";
  state: string = "1";
  time: string = "";
  address: string;
  hasRecord: boolean = false;//显示录音图标
  public filePath: any; //录音文件的名字
  public recordData: MediaObject; //录音对象
  fileTransfer: FileTransferObject;//传输类
  firstClick: boolean = true;
  playClick: boolean = true;
  photos = [];//照片
  date;

  @ViewChild('addrinput') addrinput;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alert: AlertController, private media: Media,
    private file: File, private api: Api,
    private http: HttpClient,
    private model: ModalController) {
  }

  ionViewDidLoad() {
    this.date = new Date();
    this.time = this.date.toLocaleDateString() + " " + (this.date.getHours() < 10 ? "0" + this.date.getHours() : this.date.getHours())
      + ":" + (this.date.getMinutes() < 10 ? "0" + this.date.getMinutes() : this.date.getMinutes())
      + ":" + (this.date.getSeconds() < 10 ? "0" + this.date.getSeconds() : this.date.getSeconds());
  }

  //日期
  datePicker() {

  }

  //等级
  levelAlert(event) {
    let a1 = this.alert.create();
    a1.setTitle('故障等级');
    a1.setMode('ios');
    a1.addInput({
      type: 'radio',
      label: '紧急',
      value: '紧急',
      handler: data => {
        this.level = data.value;
        a1.dismiss();
      }
    });

    a1.addInput({
      type: 'radio',
      label: '一般',
      value: '一般',
      handler: data => {
        this.level = data.value;
        a1.dismiss();
      }
    });

    a1.addInput({
      type: 'radio',
      label: '其他',
      value: '其他',
      handler: data => {
        this.level = data.value;
        a1.dismiss();
      }
    });

    a1.present();
  }

  //类型
  typeAlert(event) {
    let a3 = this.alert.create();
    a3.setMode('ios');
    a3.setTitle('故障类型');
    a3.addInput({
      type: 'radio',
      label: '电气故障',
      value: '电气故障',
      handler: data => {
        this.type = data.value;
        a3.dismiss();
      }
    });
    a3.addInput({
      type: 'radio',
      label: '机械故障',
      value: '机械故障',
      handler: data => {
        this.type = data.value;
        a3.dismiss();
      }
    });
    a3.addInput({
      type: 'radio',
      label: '物料原因故障',
      value: '物料原因故障',
      handler: data => {
        this.type = data.value;
        a3.dismiss();
      }
    });
    a3.addInput({
      type: 'radio',
      label: '能源供给故障',
      value: '能源供给故障',
      handler: data => {
        this.type = data.value;
        a3.dismiss();
      }
    });

    a3.addInput({
      type: 'radio',
      label: '其他故障',
      value: '其他故障',
      handler: data => {
        this.type = data.value;
        a3.dismiss();
      }
    });

    a3.present();
  }

  //状态
  stateAlert(event) {
    let a3 = this.alert.create();
    a3.setMode('ios');
    a3.setTitle('设备状态');
    a3.addInput({
      type: 'radio',
      label: '停机待修',
      value: '停机待修',
      handler: data => {
        this.state = data.value;
        a3.dismiss();
      }
    });
    a3.addInput({
      type: 'radio',
      label: '带病运行',
      value: '带病运行',
      handler: data => {
        this.state = data.value;
        a3.dismiss();
      }
    });
    a3.addInput({
      type: 'radio',
      label: '其他',
      value: '其他',
      handler: data => {
        this.state = data.value;
        a3.dismiss();
      }
    });

    a3.present();
  }

  //描述
  descrption() {
    let a2 = this.alert.create();
    a2.setMode('ios');
    a2.setTitle('描述');

    a2.addInput({
      type: 'input',
      name: 'title',
      placeholder: '其他'
    });

    a2.addButton('取消');
    a2.addButton({
      text: '确认',
      handler: data => {
        this.des = data.title;
      }
    });
    a2.present();
  }

  //录音开关
  record(event) {
    if (this.firstClick) {
      this.startRecord();
      this.firstClick = false;
    } else {
      this.stopRecord();
      this.firstClick = true;
    }
  }

  //开始录音
  startRecord() {

    //文件URL，文件存放在拓展内存卡中文件夹下，命名为Record.mp3
    this.filePath = this.file.externalDataDirectory + "Record_" + this.date.getDate() + this.date.getHours()
      + this.date.getMinutes() + this.date.getSeconds() + ".mp3";
    //创建media对象，参数文件名字，上面的filePath也指定了文件存放位置和文件名字
    this.recordData = this.media.create(this.filePath);
    //开始录音
    this.recordData.startRecord();
    this.hasRecord = false;
  }

  //停止录音
  stopRecord() {
    this.recordData.stopRecord();
    this.hasRecord = true;
  }

  //播放录音
  playRecord() {
    if (this.playClick) {
      this.recordData.play();
      this.playClick = false;
    } else {
      this.recordData.stop();
      this.playClick = true;
    }
  }

  //拍照
  takephoto(event) {
    this.goPhoto();
  }

  //去拍照页面
  goPhoto() {
    let newsModal = this.model.create(TakePhotoPage);
    newsModal.onDidDismiss(data => {
      console.log(data);
      this.photos.push(data);//存入照片路径
    });
    newsModal.present();
  }

  //扫描回调
  clickMe() {
    this.navCtrl.push(ScanPage, { callback: this.getIdStr })
  }

  //回调方法声明
  getIdStr = (data) => {
    return new Promise((resolve, reject) => {
      resolve();
      console.log(data);
    })
  }

  //提交数据
  commit() {
    if (this.state.length == 0) {

    }

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.api.getToken())
    let params = new HttpParams().set('deviceId', '1')
    .set('happentime',this.date.getDate() + this.date.getHours() + this.date.getMinutes() + this.date.getSeconds())
    .set('deviceState',this.state);//TODO
    let options: FileUploadOptions = {
      headers: httpHeaders,
      params: params,
    };

    var formData = new FormData();
    if (this.photos.length > 0) {
      for (var i = 0; i < this.photos.length; i++) {
        formData.append('files', this.photos[i], 'image' + i + 'jpeg');
      }
    }

    if (this.filePath != null && this.filePath.length > 0) {
      formData.append('files', this.filePath, 'audio');
    }

    this.http.post(BaseUrl + storeReport, formData, options).subscribe(res => {
      console.log(res)
      this.navCtrl.pop();
    }, err => {
      console.log(err)
    })
  }
}
