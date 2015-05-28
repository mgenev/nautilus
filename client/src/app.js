import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
  configureRouter(config, router){
    config.title = 'Nautilus';
    config.map([
      { route: ['','welcome'],  moduleId: './routes/welcome',      nav: true, title:'Welcome' },
      { route: 'geo-demo',      moduleId: './routes/geo-demo',     nav: true, title: 'Geo Demo' },
      { route: 'posts',      moduleId: './routes/posts/index',           nav: true, title: 'Posts' }
    ]);

    this.router = router;
  }
}
