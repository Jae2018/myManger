import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '../../../node_modules/@ionic-native/camera';
import { ImagePage } from '../image/image';


/**
 * Generated class for the TakePhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-take-photo',
  templateUrl: 'take-photo.html',
})
export class TakePhotoPage {

  img_data = [];
  size: number = 0;
  data;
  data2;
  data3;
  // resolve: Function;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private toast: ToastController,
    private view: ViewController) {
    // this.resolve = navParams.get('resolve');
    this.data = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakePhotoPage');
  }

  private initCamera() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
    }
    return options;
  }

  private takePhoto() {
    this.size++;
    if (this.size <= 3) {
      this.camera.getPicture(this.initCamera()).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        if (this.size == 1) {
          this.data = 'data:image/jpeg;base64,' + imageData;
        } else if (this.size == 2) {
          this.data2 = 'data:image/jpeg;base64,' + imageData;
        } else if (this.size == 3) {
          this.data3 = 'data:image/jpeg;base64,' + imageData;
        }
      }, (err) => {
        // Handle error
      });
    } else {
      this.toast.create({
        duration: 2000,
        message: "照片数最多三张",
        position: 'bottom'
      }).present();
    }
  }

  ok() {
    if (this.data != null) {
      this.img_data.push(this.data);
    }
    if (this.data2 != null) {
      this.img_data.push(this.data2);
    }
    if (this.data3 != null) {
      this.img_data.push(this.data3);
    }
    this.view.dismiss(this.img_data);
  }

  click(i) {
    if (i == 0) {
      if (this.size <= 3) {
        this.takePhoto();
      } else {
        this.toast.create({
          duration: 2000,
          message: "照片数最多三张",
          position: 'bottom'
        }).present();
      }
    } else {
      this.bigImage(i);
    }
  }

  bigImage(index) {
    this.navCtrl.push(ImagePage, { url: this.img_data[index] });
  }
}
