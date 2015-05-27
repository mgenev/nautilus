import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import Config from './services/config';

console.log(Config);
@inject(HttpClient)
export class Posts {
  heading = 'Posts';
  posts = [];
  endPoint = 'posts';

  constructor(http){
    this.http = http;
    this.config = {
      server: {
        apiPrefix: '/api/',
        address: 'http://localhost:3000',
        url: 'http://localhost:3000/api/'
      }
    };
  }

  async activate() {
    let posts = await this.http.get(`${this.config.server.url}${this.endPoint}`);
    this.posts = posts.content;
  }
}
