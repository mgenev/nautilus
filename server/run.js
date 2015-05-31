require('babel/register')({
  optional: ['bluebirdCoroutines']
});
var app = require('./server');

// auto init if this app is not being initialized by another module (i.e. using require('./app').init();)
if (!module.parent) {
  try {
    app.init();
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
}
