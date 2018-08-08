import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  resolve: Function;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private toast: ToastController) {
    this.resolve = navParams.get('resolve');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakePhotoPage');
    this.img_data.push('../assets/icon/photo.png');
  }

  private initCamera() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    return options;
  }

  private takePhoto() {
    if (this.size > 3) {
      this.toast.create({
        duration: 2000,
        message: "照片数最多三张",
        position: 'bottom'
      }).present();
    } else {
      this.camera.getPicture(this.initCamera()).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.size++;
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.img_data.push('assets/icon/photo.png');
      }, (err) => {
        // Handle error
      });
    }
  }

  private setPaths() {
    var paths = [];
    if (this.img_data.length > 1) {
      for (var i = 0; i < this.img_data.length; i++) {
        paths.push(this.img_data[i]);
      }
    }
    return paths;
  }

  callBackPaths() {
    this.resolve(this.setPaths());
  }

  click(i) {
    if (i == 0) {
      this.takePhoto();
    } else {
      this.bigImage(i);
    }
  }

  bigImage(index) {
    this.navCtrl.push(ImagePage, { 'url': this.img_data[index] });
  }
}
