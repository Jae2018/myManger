import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '../../../node_modules/@ionic-native/file-transfer';
import { Media, MediaObject } from '../../../node_modules/@ionic-native/media';
import { File } from '@ionic-native/file';
import { TakePhotoPage } from '../take-photo/take-photo';

/**
 * Generated class for the StoreRepairOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store-repair-orders',
  templateUrl: 'store-repair-orders.html',
})
export class StoreRepairOrdersPage {

  hasRecord: boolean = false;//显示录音图标
  public filePath: any; //录音文件的名字
  public recordData: MediaObject; //录音对象
  fileTransfer: FileTransferObject;//下载

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private media: Media, private file: File, private transfer: FileTransfer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreRepairOrdersPage');
  }

  startRecord() {  //开始录音
    let date = new Date();
    //文件URL，文件存放在拓展内存卡中文件夹下，命名为Record.mp3
    this.filePath = this.file.externalDataDirectory + "Record_" + date.getDate() + date.getHours()
      + date.getMinutes() + date.getSeconds() + ".mp4";
    //创建media对象，参数文件名字，上面的filePath也指定了文件存放位置和文件名字
    this.recordData = this.media.create(this.filePath);
    //开始录音
    this.recordData.startRecord();
  }

  pauseRecord() {
    //暂停录音
    this.recordData.pauseRecord();
    this.hasRecord = true;
  }

  play() {
    //播放录音
    this.recordData.play();
  }

  stopPlay() {
    //停止播放录音
    this.recordData.stop();
  }

  resumeRecord() {
    //继续录音
    this.recordData.resumeRecord();
  }

  stopRecord() {
    //停止结束录音
    this.recordData.stopRecord();
  }

  goPhoto() {
    new Promise((resolve, reject) => {
      this.navCtrl.push(TakePhotoPage, { resolve: resolve });
    }).then(() => {
      // 若修改成功返回则在该代码块中将本页的 nickname 修改
    })
  }

}
