import {inject} from 'aurelia-framework';
import {GeoGoogleService} from 'services/geo-google';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(GeoGoogleService, EventAggregator)
export class GeoIndex {
  heading = 'Geo Demo';
  constructor(geo, eventAggregator) {
    this.geo = geo;
    this.eventAggregator = eventAggregator;
  }

  activate() {
    this.setGeo();
    this.eventAggregator.subscribe('googleMaps:markerClick', index => this.highlightPlace(index));
    this.eventAggregator.subscribe('googleMaps:mapRendered', () => this.drawMap());
  }

  async setGeo() {
    try {
      this.geoData = await this.geo.getGeoposition();
      this.address = await this.geo.getAddressForLatLong(this.geoData);
    } catch (err) {
      console.log('ERR: ' , err);
    }
  }

  drawMap() {
    let opts = {
      geo: this.geoData,
      mapElementSelector: 'mapfeed',
      pinCenter: true,
      type: 'ROADMAP'
    };
    this.geo.drawMap(opts);
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

    try {
      this.places = await this.geo.getNearbyPlaces(opts);
      console.log(this.places);
    } catch (err) {
      console.log('ERR: ', err);
    }
  }

  highlightPlace(index) {
    if (this.activeClass !== undefined) {
      this.places[this.activeClass].class='';
    }
    this.activeClass=index;
    this.places[index].class='place-active';
  }
}
