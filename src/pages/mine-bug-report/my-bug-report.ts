import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the MyBugReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-bug-report',
  templateUrl: 'my-bug-report.html',
})
export class MyBugReportPage {

  public opinion: string;//处理意见
  public description: string;//问题描述
  public size: number = 0;//照片数量

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,public camera:Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBugReportPage');
  }

  textDes(event) {
    const prompt = this.alertCtrl.create({
      title: '故障描述',
      // message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: '例如：漏水'
        },
      ],
      buttons: [
        {
          text: '确定',
          handler: data => {
            this.opinion = data.title;
          }
        },
        {
          text: '取消',
          handler: data => {
            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

  setOpinion(event) {
    const prompt = this.alertCtrl.create({
      title: '处理意见',
      // message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: '例如：修复'
        },
      ],
      buttons: [
        {
          text: '确定',
          handler: data => {
            this.description = data.title;
          }
        },
        {
          text: '取消',
          handler: data => {
            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

  goScanPhoto(event){

  }

  getImage(event){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.size++;
      console.log(base64Image);
     }, (err) => {
      // Handle error
      console.log(err);
     });
  }

}
