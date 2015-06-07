import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'services/config';
import {Session} from 'services/session';

@inject(HttpClient, Config, Session)
export class Vendors {
  heading = 'Vendors';
  vendors = [];
  endPoint = 'vendors';

  constructor(http, config, session){
    this.http = http;
    this.config = config;
    this.session = session;
  }

  async activate() {
    try {
      let query = `{"user": "${this.session.currentUser._id}"}`;
      let vendors = await this.http.get(`${this.config.server.url}${this.endPoint}?conditions=${query}`);
      this.vendors = vendors.content;
    } catch (err) {
      // TODO flash a global error message
      console.log('error connecting: ', err);
    }
  }
}
