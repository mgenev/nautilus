import {customElement, bindable, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'services/config';

@customElement('service-add')
@inject(HttpClient, Config)
export class SayHello {
  @bindable vendor = null;
  endPoint = 'services';
  service = {};

  constructor(http, config){
    this.http = http;
    this.config = config;
  }

  async createService() {
    try {
      this.service.vendor = this.vendor._id;
      let newService = await this.http.post(`${this.config.server.url}${this.endPoint}`, this.service);
      // TODO add new service to the parent's list
      // this.router.navigateToRoute('serviceById', {id: newService.content._id});

    } catch (err) {
      // TODO flash a global error message
      console.log('error creating service: ', err);
    }
  }
}
