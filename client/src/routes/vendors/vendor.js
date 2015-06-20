import {inject, bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'services/config';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GeoGoogleService} from 'services/geo-google';

@inject(HttpClient, Config, EventAggregator, GeoGoogleService)
// TODO rename to vendorRoute and all other routes too
export class Vendor {
  heading = 'Single Vendor';
  showingAddService = false;

  closeModal() {
    this.showingAddService = false;
  }

  openModal() {
    this.showingAddService = true;
  }

  readyToDrawMap = {
    domReady: false,
    vendorDataReady: false
  };

  constructor(http, config, ea, geo){
    this.http = http;
    this.config = config;
    this.ea = ea;
    this.geo = geo;
    this.ea.subscribe('vendors:serviceCreated', service => {
      this.services.push(service);
      this.closeModal();
    });
  }

  attached () {
    this.readyToDrawMap.domReady = true;
    this.drawMap();
  }

  async activate(params, routeConfig) {
    try {
      let query = `{"vendor": "${params.id}"}`;
      let vendor = await this.http.get(`${this.config.server.url}vendors/${params.id}`);
      let services = await this.http.get(`${this.config.server.url}services?conditions=${query}`);
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
