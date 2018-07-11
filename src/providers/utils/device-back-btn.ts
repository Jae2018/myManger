import { App, LoadingController } from "ionic-angular/umd";



export class MyBtnListener {

  presentLoading() {
    this.loader.present();
  }

  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 2000
  });

  constructor(public app: App, public loadingCtrl: LoadingController) {
    this.app.viewDidLeave.subscribe(() => {
      if (this.loader && this.loader._state === 1) {
        this.loader.dismiss();
      }
    });
  }

}
