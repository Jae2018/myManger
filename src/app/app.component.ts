import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform, App, Events } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import { MainPage, FirstRunPage } from '../pages';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/utils/network-check-tool';

@Component({
  template:
    // `<ion-menu [content]="content">
    // <ion-header>
    //   <ion-toolbar>
    //     <ion-title>Pages</ion-title>
    //   </ion-toolbar>
    // </ion-header>

    // <ion-content>
    //   <ion-list>
    //     <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
    //       {{p.title}}
    //     </button>
    //   </ion-list>
    // </ion-content>
    // </ion-menu>
    `<ion-nav #content [root]="rootPage"></ion-nav>`
  // templateUrl:'app.html'

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
    public networkProvider: NetworkProvider) {
    //导航页
    storage.get('firstIn').then((result) => {
      if (result) {
        this.rootPage = MainPage;
      } else {
        storage.set('firstIn', true);
        this.rootPage = FirstRunPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('android')) {
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString('#16b2ff');
      } else {
        this.statusBar.styleDefault();
      }
      this.splashScreen.hide();

      this.tabsPage = MainPage;

      this.networkProvider.initializeNetworkEvents();

      // Offline event
      this.eventCtrl.subscribe('network:offline', () => {
        alert('network:offline ==> ' + this.network.type);
      });

    });

    // this.global.registerBackButtonAction(tabRef);

  }

  initializeApp() {
    console.log("app start");
  }

  // initTranslate() {
  //   // Set the default language for translation strings, and the current language.
  //   this.translate.setDefaultLang('en');
  //   const browserLang = this.translate.getBrowserLang();

  //   if (browserLang) {
  //     if (browserLang === 'zh') {
  //       const browserCultureLang = this.translate.getBrowserCultureLang();

  //       if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
  //         this.translate.use('zh-cmn-Hans');
  //       } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
  //         this.translate.use('zh-cmn-Hant');
  //       }
  //     } else {
  //       this.translate.use(this.translate.getBrowserLang());
  //     }
  //   } else {
  //     this.translate.use('en'); // Set your language here
  //   }

  //   this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
  //     this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
  //   });
  // }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
}
