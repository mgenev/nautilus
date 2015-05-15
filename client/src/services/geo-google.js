import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {point} from './utils/to-geo-json';

@inject(HttpClient)
class GeoGoogleService {

  constructor(http){
    this.http = http;
  }


}

export {
  GeoGoogleService
}
