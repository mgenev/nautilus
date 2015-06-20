import 'bootstrap';

export class App {
  configureRouter(config, router){
    config.title = 'Nautilus';
    config.map([
      { route: ['','home'],      moduleId: './routes/home/index',      nav: true, title:'Welcome' },
      { route: 'geo-demo',       moduleId: './routes/geo/index',     nav: true, title: 'Geo Demo' },
      { route: 'log',          moduleId: './routes/log/index',     name: 'posts', nav: true, title: 'Posts' },
      { route: 'log/post/:id',      moduleId: './routes/log/post',      name: 'postById'},
      { route: 'log/new',      moduleId: './routes/log/new',           nav: true, title: 'New Post' },
      { route: 'vendors',        moduleId: './routes/vendors/index',     name: 'vendors', nav: true, title: 'Vendors' },
      { route: 'vendors/:id',    moduleId: './routes/vendors/vendor',      name: 'vendorById'},
      { route: 'vendors/new',    moduleId: './routes/vendors/new',           nav: true, title: 'New Vendor' }
    ]);

    this.router = router;
  }

}
