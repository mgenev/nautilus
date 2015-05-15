import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Flickr{
  heading = 'Flickr';
  images = [];
  url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=rainier&tagmode=any&format=json';

  constructor(http){
    this.http = http;
  }

  async activate(){
    let data await this.http.jsonp(this.url);
    this.images = response.content.items;    
  }

  canDeactivate(){
    return confirm('Are you sure you want to leave?');
  }
}
