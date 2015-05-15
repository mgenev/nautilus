import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {GeoGoogleService} from './services/geo-google';

@inject(HttpClient, GeoGoogleService)
export class GeoDemo {
  heading = 'Geo Demo';
  constructor(http, geo) {
    this.http = http;
    this.geo = geo;
  }

  async activate() {
    this.address = await this.geo.getCurrentAddress();
  }
}
