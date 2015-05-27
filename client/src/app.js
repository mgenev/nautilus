import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
  configureRouter(config, router){
    config.title = 'Nautilus';
    config.map([
      { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
      { route: 'geo-demo',      moduleId: './geo-demo',     nav: true, title: 'Geo Demo' },
      { route: 'posts',      moduleId: './posts',           nav: true, title: 'Posts' }
    ]);

    this.router = router;
  }
}
