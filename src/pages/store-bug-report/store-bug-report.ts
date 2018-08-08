import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { TakePhotoPage } from '../take-photo/take-photo';

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
  des: string = "";
  level: string = "";
  type: string = "";
  state: string = "";
  time: string = "";
  hasRecord: boolean = false;//显示录音图标
  public filePath: any; //录音文件的名字
  public recordData: MediaObject; //录音对象
  fileTransfer: FileTransferObject;//传输类
  btn: string = "按住说话，描述故障";
  firstClick: boolean = false;
  // pressGesture: Gesture;
  // private s:Gesture;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alert: AlertController, private camera: Camera,
    private media: Media, private file: File, private transfer: FileTransfer) {
  }

  ionViewDidLoad() {


    var date = new Date();
    this.time = date.toLocaleDateString() + " " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
      + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
      + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
    this.firstClick = true;
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
        this.state = data.value;
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
        this.type = data.title;
      }
    });
    a2.present();
  }

  record(event) {
    if (this.firstClick) {
      this.startRecord();
      this.firstClick = false;
    } else {
      this.stopRecord();
      this.firstClick = true;
    }
  }

  startRecord() {  //开始录音
    let date = new Date();
    //文件URL，文件存放在拓展内存卡中文件夹下，命名为Record.mp3
    this.filePath = this.file.externalDataDirectory + "Record_" + date.getDate() + date.getHours()
      + date.getMinutes() + date.getSeconds() + ".mp3";
    //创建media对象，参数文件名字，上面的filePath也指定了文件存放位置和文件名字
    this.recordData = this.media.create(this.filePath);
    //开始录音
    this.recordData.startRecord();

    console.log('start');
    this.firstClick = false;
  }

  stopRecord() {
    //停止录音
    this.recordData.stopRecord();
    // this.hasRecord = true;

    console.log('stop');
    this.firstClick = true;
  }

  //播放录音
  playRecord() {
    console.log('start');
    this.recordData.play();
  }


  //拍照
  takephoto(event) {
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64 (DATA_URL):
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //   console.log(base64Image);
    // }, (err) => {
    //   // Handle error
    //   console.log(err);
    // });

    this.goPhoto();
  }

  commit(){

  }

  goPhoto() {
    new Promise((resolve, reject) => {
      this.navCtrl.push(TakePhotoPage, { resolve: resolve });
    }).then(data => {
      // 若修改成功返回则在该代码块中将本页的 nickname 修改
      console.log(data)
    })
  }

}
