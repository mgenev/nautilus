import {inject} from 'aurelia-framework';
import {GeoGoogleService} from './services/geo-google';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(GeoGoogleService, EventAggregator)
export class GeoDemo {
  heading = 'Geo Demo';
  constructor(geo, eventAggregator) {
    this.geo = geo;
    this.eventAggregator = eventAggregator;
    this.eventAggregator.subscribe('googleMaps:markerClick', this.highlightPlace);
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
    this.geo.clearMarkers();
    this.places = [];
    let opts = {
      geo: this.geoData,
      radius: 500,
      query: this.query,
      pinMarkers: true
    };

    this.places = await this.geo.getNearbyPlaces(opts);
  }

  showMarkerInfoWindow(i) {
    this.geo.placeListingClick(window.markers[i]);
  }

  highlightPlace(index) {
    $('.place-active').removeClass('place-active');
    $('.place-'+index).addClass('place-active');
  }
}
