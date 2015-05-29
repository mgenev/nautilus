import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from '../../services/config';
import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(HttpClient, Config, Router)
export class Posts {
  heading = 'Posts';
  endPoint = 'posts';

  @computedFrom('title', 'content')
  get post(){
    return JSON.stringify({ title: this.title, content: this.content });
  }

  constructor(http, config, router){
    this.http = http.configure(x => {
      x.withHeader('Content-Type', 'application/json');
    });
    this.config = config;
    this.router = router;
  }

  async createPost() {
    try {
      let newPost = await this.http.post(`${this.config.server.url}${this.endPoint}`, this.post);
      this.router.navigateToRoute('postById', {id: newPost.content._id});
    } catch (err) {
      // TODO flash a global error message
      console.log('error connecting: ', err);
    }
  }
}
