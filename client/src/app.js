export class App {
  configureRouter(config, router){
    config.title = 'Nautilus';
    config.map([
      { route: ['','home'],      moduleId: './routes/home/index',      nav: true, title:'Welcome' },
      { route: 'geo-demo',       moduleId: './routes/geo/index',     nav: true, title: 'Geo Demo' },
      { route: 'posts',          moduleId: './routes/posts/index',     name: 'posts', nav: true, title: 'Posts' },
      { route: 'posts/:id',      moduleId: './routes/posts/post',      name: 'postById'},
      { route: 'posts/new',      moduleId: './routes/posts/new',           nav: true, title: 'New Post' },
      { route: 'vendors',        moduleId: './routes/vendors/index',     name: 'vendors', nav: true, title: 'Vendors' },
      { route: 'vendors/:id',    moduleId: './routes/vendors/vendor',      name: 'vendorById'},
      { route: 'vendors/new',    moduleId: './routes/vendors/new',           nav: true, title: 'New Vendor' }
    ]);

    this.router = router;
  }
}
