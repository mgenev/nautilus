import {customElement, bindable, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'services/config';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Vendor} from 'routes/vendors/vendor';

@inject(HttpClient, Config, EventAggregator, Vendor)
export class SayHello {
  @bindable vendor = null;
  endPoint = 'services';
  service = {};

  constructor(http, config, ea, vendor) {
    this.http = http;
    this.config = config;
    this.ea = ea;
    this.vendor = vendor.vendor;
  }

  async createService() {
    try {
      this.service.vendor = this.vendor._id;
      let newService = await this.http.post(`${this.config.server.url}${this.endPoint}`, this.service);

      for (let prop in this.service) {
        console.log(this.service[prop]);
        this.service[prop] = '';
      };
      this.ea.publish('vendors:serviceCreated', newService.content);
    } catch (err) {
      // TODO flash a global error message
      console.log('error creating service: ', err);
    }
  }
}
