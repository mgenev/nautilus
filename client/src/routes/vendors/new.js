import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from '../../services/config';
import {Session} from '../../services/session';
import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(HttpClient, Config, Router, Session)
export class NewVendor {
  heading = 'Vendor';
  endPoint = 'vendors';

  @computedFrom('name', 'description')
  get vendor(){
    return { name: this.name, description: this.description, user: this.session.currentUser._id };
  }

  constructor(http, config, router, session){
    this.http = http.configure(x => {
      x.withHeader('Content-Type', 'application/json');
    });
    this.config = config;
    this.router = router;
    this.session = session;
  }

  async createPost() {
    try {
      let new = await this.http.post(`${this.config.server.url}${this.endPoint}`, this.vendor);
      this.router.navigateToRoute('vendorById', {id: new.content._id});
    } catch (err) {
      // TODO flash a global error message
      console.log('error connecting: ', err);
    }
  }
}
