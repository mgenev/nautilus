import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from '../../services/config';
import {computedFrom} from 'aurelia-framework';

@inject(HttpClient, Config)
export class Posts {
  heading = 'Posts';
  endPoint = 'posts';

  @computedFrom('title', 'content')
  get post(){
    return JSON.stringify({ title: this.title, content: this.content });
  }

  constructor(http, config){
    this.http = http;
    this.config = config;
  }

  async createPost() {
    try {
      console.log(this.post);
      let newPost = await this.http.post(`${this.config.server.url}${this.endPoint}`, this.post);
      console.log(newPost.content);
    } catch (err) {
      // TODO flash a global error message
      console.log('error connecting: ', err);
    }
  }
}
