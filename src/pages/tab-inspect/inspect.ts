import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentListPage } from '../equipment-list/equipment-list';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { BaseUrl, parstList, inspect } from '..';

/**
 * Generated class for the InspectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inspect',
  templateUrl: 'inspect.html',
})
export class InspectPage implements OnInit {

  public list = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient) {


  }

  ngOnInit() {
    this.list.push(
      {
        title: "巡检测试计划1",
        date: "2018-08-15",
        time: "12:10:12",
        state: "1天前"
      },
      {
        title: "巡检测试计划2",
        date: "2018-08-15",
        time: "12:12:32",
        state: "1天前"
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectPage');
    this.getData();
  }

  getData() {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYnl3IiwidXNlcklkIjo3Niwicm9sZUlkIjo3MSwiY29tcElkIjo5NCwiZW50VHlwZSI6IjEiLCJleHAiOjE1MzM4MDU5Mjl9.VcFx9dwfe1-NxAXtahCBd_V7fQVEYlCWq65tp3GY2cQGzGgVzjeX-XY4D6syBEUmi8U2LO-StYt4DEy0HhKoqw');
    // let params = { 'pinpaiID': '88' }
    let options = {
      headers: httpHeaders,
      // params: params
    };
    this.http.post(BaseUrl + inspect, null, options).subscribe(res => {
      console.log(res)
    }, err => {

    })
  }

  goDetail(event, index) {
    this.navParams = index;
    this.navCtrl.push(EquipmentListPage, this.navParams);
  }
}
