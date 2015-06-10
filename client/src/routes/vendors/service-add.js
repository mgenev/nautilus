import {customElement, bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'services/config';

@customElement('service-add')
export class SayHello {
  @bindable vendor = null;
  endpoint = 'services';
  service = {};

  constructor(http, config){
    this.http = http;
    this.config = config;
  }

  async createService() {
    try {
      this.service.vendor = this.vendor._id;
      let newService = await this.http.post(`${this.config.server.url}${this.endPoint}`, this.vendor);
      this.router.navigateToRoute('serviceById', {id: newService.content._id});
    } catch (err) {
      // TODO flash a global error message
      console.log('error creating service: ', err);
    }
  }
}
