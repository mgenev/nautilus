import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'services/config';

@inject(HttpClient, Config)
export class Posts {
  heading = 'Single Post';
  endPoint = 'posts';

  constructor(http, config){
    this.http = http;
    this.config = config;
  }

  async activate(params, routeConfig) {
    try {
      let post = await this.http.get(`${this.config.server.url}${this.endPoint}/${params.id}`);
      this.post = post.content;
      routeConfig.navModel.title = this.post.title;
    } catch (err) {
      // TODO flash a global error message
      console.log('error connecting: ', err);
    }
  }
}
