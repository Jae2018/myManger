import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import { MainPage, FirstRunPage } from '../pages';

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

  constructor(private translate: TranslateService, platform: Platform, storage: Storage,
    private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    storage.get('firstIn').then((result) => {
      result = false;
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.tabsPage = MainPage;
      document.addEventListener('backbutton', () => {
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;

        if (!(page instanceof this.tabsPage)) {
          if (!this.nav.canGoBack()) {
            return platform.exitApp();
          }
          return this.nav.pop();
        }

        let tabs = page.tabs;
        let activeNav = tabs.getSelected();

        if (!activeNav.canGoBack()) {
          console.log('检测到在 tab 页面的顶层点击了返回按钮。');
          return platform.exitApp();
        }

        console.log('检测到当前 tab 弹出层的情况下点击了返回按钮。');
        return activeNav.pop();

      }, false);
    });
    this.initTranslate();

  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
