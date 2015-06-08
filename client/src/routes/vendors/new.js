import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from '../../services/config';
import {Session} from '../../services/session';
import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {GeoGoogleService} from 'services/geo-google';

@inject(HttpClient, Config, Router, Session, GeoGoogleService)
export class NewVendor {
  heading = 'Vendor';
  endPoint = 'vendors';
  vendor = {};

  constructor(http, config, router, session, geo){

    this.http = http;
    this.config = config;
    this.router = router;
    this.session = session;
    this.geo = geo;
  }

  async createPost() {
    try {
      this.vendor.location = await this.geo.getLatLongForAddress(this.vendor.address);
      this.vendor.user = this.session.currentUser._id;
      this.http = this.http.configure(x => {
        x.withHeader('Content-Type', 'application/json');
      });
      let newVendor = await this.http.post(`${this.config.server.url}${this.endPoint}`, this.vendor);
      this.router.navigateToRoute('vendorById', {id: newVendor.content._id});
    } catch (err) {
      // TODO flash a global error message
      console.log('error connecting: ', err);
    }
  }
}
