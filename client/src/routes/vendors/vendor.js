import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'services/config';

@inject(HttpClient, Config)
export class Posts {
  heading = 'Single Vendor';

  constructor(http, config){
    this.http = http;
    this.config = config;
  }

  async activate(params, routeConfig) {
    try {
      let vendor = await this.http.get(`${this.config.server.url}vendors/${params.id}`);
      let services = await this.http.get(`${this.config.server.url}services?vendor=${params.id}`);
      this.vendor = vendor.content;
      this.services = services.content;
      routeConfig.navModel.title = this.vendor.name;
    } catch (err) {
      // TODO flash a global error message
      console.log('error connecting: ', err);
    }
  }
}
