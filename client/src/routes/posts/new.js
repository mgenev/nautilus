import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from '../../services/config';
import {Session} from '../../services/session';
import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(HttpClient, Config, Router, Session)
export class PostsNewRoute {
  heading = 'Posts';
  endPoint = 'posts';

  @computedFrom('title', 'content')
  get post(){
    return { title: this.title, content: this.content, user: this.session.currentUser._id };
  }

  constructor(http, config, router, session){
    this.http = http;
    this.config = config;
    this.router = router;
    this.session = session;
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
