import { App, Platform, ToastController, Tabs, NavController } from "ionic-angular";
import { Injectable } from "@angular/core";
import { LoginPage } from "../../pages/login/login";
import { WorkListPage } from "../../pages/tab-work/work-list";

@Injectable()
export class GlobalUtils {

  //控制硬件返回按钮是否触发，默认false
  backButtonPressed: boolean = false;

  constructor(public app: App, public platform: Platform, public toast: ToastController) { }

  //注册方法
  public registerBackButtonAction(tabRef: Tabs): void {

    //registerBackButtonAction是系统自带的方法
    this.platform.registerBackButtonAction(() => {
      //获取NavController
      let activeNav: NavController = this.app.getActiveNavs()[0];

      //如果可以返回上一页，则执行pop
      if (activeNav.canGoBack()) {
        activeNav.pop();
      } else {
        if (tabRef == null || tabRef._selectHistory[tabRef._selectHistory.length - 1] === tabRef.getByIndex(0).id) {
          if (activeNav.getByIndex(0).component == LoginPage || activeNav.getByIndex(0).component == WorkListPage) {
            //执行退出
            this.showExit();
          } else {
            activeNav.pop();
          }
        } else {
          //选择首页第一个的标签
          tabRef.select(0);
        }
        if (tabRef != null && tabRef._getSelectedTabIndex() != 0) {

        }
      }
    });
  }

  //退出应用方法
  private showExit(): void {
    //如果为true，退出
    if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
      //第一次按，弹出Toast
      this.toast.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'bottom'
      }).present();
      //标记为true
      this.backButtonPressed = true;
      //两秒后标记为false，如果退出的话，就不会执行了
      setTimeout(() => this.backButtonPressed = false, 2000);
    }
  }
}
