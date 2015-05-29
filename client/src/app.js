import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
  configureRouter(config, router){
    config.title = 'Nautilus';
    config.map([
      { route: ['','welcome'],   moduleId: './routes/welcome',      nav: true, title:'Welcome' },
      { route: 'geo-demo',       moduleId: './routes/geo-demo',     nav: true, title: 'Geo Demo' },
      { route: 'posts',          moduleId: './routes/posts/index',     name: 'posts', nav: true, title: 'Posts' },
      { route: 'posts/:id',      moduleId: './routes/posts/post',      name: 'postById', title: this.dynamicTitle },
      { route: 'posts/new',      moduleId: './routes/posts/new',           nav: true, title: 'New Post' }
    ]);

    this.router = router;
    this.router.dynamicTitle = 'WTF!';
  }
}
