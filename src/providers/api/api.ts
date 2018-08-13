import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://192.168.1.67:8080/sale_inte';
  public access_token: string = '';
  httpOptions;
  httpHeaders;

  constructor(public http: HttpClient, public storge: Storage) {
  }

  setToken(token){
    this.access_token = 'Bearer '+token;
  }

  getToken() {
    return this.access_token;
  }

  setHeader() {
    if (Object.keys(this.httpHeaders).length == 0) {
      this.httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Cache-Control', 'no-cache')
        .set('Authorization', this.getToken());
    }
    return this.httpHeaders;
  }

  setParams(){

  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        headers: new HttpHeaders().set('Authorization', ''),
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  getSms(device) {
    this.http.post('', device, {})
  }

  getCheckCode(){

  }

  login(uuid) {

  }

  getDeviceList() {

  }



}
