import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'services/config';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GeoGoogleService} from 'services/geo-google';

@inject(HttpClient, Config, EventAggregator, GeoGoogleService)
export class Posts {
  heading = 'Single Vendor';
  readyToDrawMap = {
    domReady: false,
    vendorDataReady: false
  };

  constructor(http, config, ea, geo){
    this.http = http;
    this.config = config;
    this.ea = ea;
    this.geo = geo;
    this.ea.subscribe('vendors:serviceCreated', service => this.services.push(service));
  }

  attached () {
    this.readyToDrawMap.domReady = true;
    this.drawMap();
  }

  async activate(params, routeConfig) {
    try {
      let vendor = await this.http.get(`${this.config.server.url}vendors/${params.id}`);
      let services = await this.http.get(`${this.config.server.url}services?vendor=${params.id}`);
      this.vendor = vendor.content;
      this.services = services.content;
      routeConfig.navModel.title = this.vendor.name;
      this.readyToDrawMap.vendorDataReady = true;
      this.drawMap();
    } catch (err) {
      // TODO flash a global error message
      console.log('error connecting: ', err);
    }
  }

  drawMap() {
    if (this.readyToDrawMap.domReady && this.readyToDrawMap.vendorDataReady) {
      let opts = {
        geo: {latitude: this.vendor.location.coordinates[1], longitude: this.vendor.location.coordinates[0]},
        mapElementSelector: 'mapfeed',
        pinCenter: true,
        type: 'ROADMAP'
      };
      this.geo.drawMap(opts);
    }
  }
}
