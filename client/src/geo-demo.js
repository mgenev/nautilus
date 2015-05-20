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

      let opts = {
        geo: this.geoData,
        mapElementSelector: 'mapfeed',
        pinCenter: true,
        type: 'ROADMAP'
      };
      this.geo.drawMap(opts);
    } catch (err) {
      console.log('ERR: ' , err);
    }
  }

  async searchPlaces() {
    let opts = {
      geo: this.geoData,
      radius: 500,
      query: this.query,
      pinMarkers: true
    };
    this.geo.clearMarkers();
    this.places = [];
    this.places = await this.geo.getNearbyPlaces(opts);
  }
}
