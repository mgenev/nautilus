import {customElement, bindable, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'services/config';
import {EventAggregator} from 'aurelia-event-aggregator';


@customElement('service-add')
@inject(HttpClient, Config, EventAggregator)
export class SayHello {
  @bindable vendor = null;
  endPoint = 'services';
  service = {};

  constructor(http, config, ea){
    this.http = http;
    this.config = config;
    this.ea = ea;
  }

  async createService() {
    try {
      this.service.vendor = this.vendor._id;
      let newService = await this.http.post(`${this.config.server.url}${this.endPoint}`, this.service);
      this.ea.publish('vendors:serviceCreated', newService.content);
    } catch (err) {
      // TODO flash a global error message
      console.log('error creating service: ', err);
    }
  }
}
