import {inject} from 'aurelia-framework';
import {GeoGoogleService} from './services/geo-google';

@inject(GeoGoogleService)
export class GeoDemo {
  heading = 'Geo Demo';
  constructor(geo) {
    this.geo = geo;
  }

  activate() {
    this.setGeo();
  }

  async setGeo() {
    try {
      this.geoData = await this.geo.getGeoposition();
      this.address = await this.geo.getAddressForLatLong(this.geoData);
      this.geo.drawMap(this.geoData, 'mapfeed');
    } catch (err) {
      console.log('ERR: ' , err);
    }
  }

  async searchPlaces() {
    this.places = await this.geo.getNearbyPlaces(this.geoData, 500, this.query, true);
  }
}
