import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalToolProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalToolProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GlobalToolProvider Provider');
  }

}
