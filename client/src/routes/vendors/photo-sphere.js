import {customElement, bindable, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'services/config';
import {EventAggregator} from 'aurelia-event-aggregator';


@customElement('photo-sphere')
@inject(HttpClient, Config, EventAggregator)
export class VendorServiceAdd {
  showingPhotoSphere = false;
  showingSphere1 = true;
  showingSphere2 = false;
  showingStreetView = false;

  nextSphere() {
    this.showingSphere1 = false;
    this.showingStreetView = false;
    this.showingSphere2 = true;
  }

  prevSphere() {
    this.showingSphere2 = false;
    this.showingStreetView = false;
    this.showingSphere1 = true;
  }

  showStreetView() {
    this.showingSphere2 = false;
    this.showingSphere1 = false;
    this.showingStreetView = true;
  }

  closePhotoSphere() {
    this.showingPhotoSphere = false;
  }

  openPhotoSphere() {
    this.showingPhotoSphere = true;
  }




  constructor(http, config, ea) {
    this.http = http;
    this.config = config;
    this.ea = ea;
    // this.vendor = vendor.vendor;
  }
}
