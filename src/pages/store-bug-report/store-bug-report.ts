import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  time:string = "";
  // event = {
  //   month: '2018-08-01',
  //   timeStarts: '12:00',
  //   timeEnds: '2018-12-31'
  // }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alert: AlertController, private camera: Camera) {
  }

  ionViewDidLoad() {
    var date = new Date();
    this.time = date.toLocaleDateString() + " " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
      + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
      + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());

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
        this.state = data.value;
        a3.dismiss();
      }
    });
    a3.addInput({
      type: 'radio',
      label: '机械故障',
      value: '机械故障',
      handler: data => {
        this.state = data.value;
        a3.dismiss();
      }
    });
    a3.addInput({
      type: 'radio',
      label: '物料原因故障',
      value: '物料原因故障',
      handler: data => {
        this.state = data.value;
        a3.dismiss();
      }
    });
    a3.addInput({
      type: 'radio',
      label: '能源供给故障',
      value: '能源供给故障',
      handler: data => {
        this.state = data.value;
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
  descrption(){
    let a2 = this.alert.create();
    a2.setMode('ios');
    a2.setTitle('描述');

    a2.addInput({
      type: 'input',
      name:'title',
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

  //拍照
  takephoto(event) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

}
