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

  activate() {
    this.setGeo();
  }

  async setGeo() {
    try {
      let geoData = await this.geo.getGeoposition();
      this.address = await this.geo.getAddressForLatLong(geoData);
      this.geo.drawMap(geoData, 'mapfeed');
      this.nearbyPlaces = await this.geo.getNearbyPlaces(geoData, true);
    } catch (err) {
      console.log('ERR: ' , err);
    }
  }
}
