import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepairReportPage } from '../repair-report/repair-report';

/**
 * Generated class for the MyWorkListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-work-list',
  templateUrl: 'my-work-list.html',
})
export class MyWorkListPage implements OnInit{

  items = [];
  state: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.items.push(
        {
          title: "呵呵",
          content: "哈哈",
          state:1,
          level:1,
        },{
          title: "呵呵",
          content: "哈哈",
          state:2,
          level:2,
        }
        ,{
          title: "呵呵",
          content: "哈哈",
          state:3,
          level:1,
        }
      );
  }

  ngOnInit(): void {
    console.log('ionViewDidLoad MyWorkListPage');
  }

  ionViewDidLoad() {

  }

  getDetail() {
    return this.items;
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {
      setTimeout(() => {
        for (var i = 0; i < 5; i++) {
          this.items.push(
            {
              title: "呵呵",
              content: "哈哈"
            }
          );
        }

        console.log('Async operation has ended');
        resolve();
      }, 1000);
    })
  }

  goDetail() {
    this.navCtrl.push(RepairReportPage, this.navParams);
  }

}
