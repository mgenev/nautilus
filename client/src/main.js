export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('./utils/index')
    .plugin('aurelia-bs-modal')
    .plugin('aurelia-computed');
    // .plugin('aurelia-animator-css');


  aurelia.start().then(a => a.setRoot());
}
