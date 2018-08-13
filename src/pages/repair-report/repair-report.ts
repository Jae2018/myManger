import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '../../../node_modules/@ionic/storage';

/**
 * Generated class for the RepairReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repair-report',
  templateUrl: 'repair-report.html',
})
export class RepairReportPage {

  public list = [];
  hasRecord: boolean = false;//显示录音图标
  public filePath: any; //录音文件的名字
  public recordData: MediaObject; //录音对象
  fileTransfer: FileTransferObject;//下载

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private media: Media, private file: File, private transfer: FileTransfer, private storge: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairReportPage');
    this.fileTransfer = this.transfer.create();
  }

  getToken() {
    var token;
    this.storge.get('user').then(user => {
      token = user['token']
    })
    return token;
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

  download() {
    const url = 'http://www.example.com/file.pdf';
    this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }

}
