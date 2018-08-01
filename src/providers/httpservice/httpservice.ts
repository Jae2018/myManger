import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpserviceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpserviceProvider Provider');
  }

  private BASE_URL = "https://www.goodb2b.cn/sale_inte";

  private handleSuccess(res) {

  }

  private handleError(err) {

  }

  private get(url: string) {
    this.http.get(this.BASE_URL + url).share();
  }

  private post(url: string, params: HttpParams) {
    this.http.post(this.BASE_URL + url, params).share();
  }

  public login(){

  }

}
