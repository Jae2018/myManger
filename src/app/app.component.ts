import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform, App, Events, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import { MainPage } from '../pages';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/utils/network-check-tool';
import { LoginPage } from '../pages/login/login';

@Component({
  template:
    `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;
  tabsPage: any;

  @ViewChild(Nav) nav: Nav;

  constructor(public app: App, public platform: Platform, public storage: Storage,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public eventCtrl: Events,
    public network: Network,
    public toastCtrl: ToastController,
    public networkProvider: NetworkProvider) {
    //start root
    // storage.get('user').then((result) => {
    //   if (result) {
    //     this.rootPage = MainPage;//LoginPage
    //   } else {
        this.rootPage = LoginPage;
    //   }
    // });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('android')) {
        this.statusBar.backgroundColorByHexString('#16b2ff');
      } else if (platform.is('ios')) {
        this.statusBar.styleDefault();
      }
      this.splashScreen.hide();

      this.tabsPage = MainPage;

      this.networkProvider.initializeNetworkEvents();

      // Offline event
      this.eventCtrl.subscribe('network:offline', () => {
        this.toastCtrl.create({
          message: "网络已断开",
          duration: 2000,
          position: 'bottom'
        })
      });

    });

  }


  initializeApp() {
    console.log("app start");
  }


}
