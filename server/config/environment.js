/**
 * Environment variables and application configuration.
 */

var path = require('path'),
    _ = require('lodash');

var baseConfig = {
  app: {
    apiPrefix: 'api',
    root: path.normalize(__dirname + '/../..'),
    env: process.env.NODE_ENV,
    secret: process.env.SECRET || 'secret key' /* used in signing the jwt tokens */
  }
};

// environment specific config overrides
var platformConfig = {
  development: {
    app: {
      port: 3000
    },
    mongo: {
      url: 'mongodb://localhost:27017/nautilus'
    },
    oauth: {
      facebook: {
        clientId: '231235687068678',
        clientSecret: process.env.FACEBOOK_SECRET || '4a90381c6bfa738bb18fb7d6046c14b8',
        callbackUrl: 'http://localhost:3000/signin/facebook/callback'
      },
      google: {
        clientId: '147832090796-ckhu1ehvsc8vv9nso7iefvu5fi7jrsou.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_SECRET || 'MGOwKgcLPEfCsLjcJJSPeFYu',
        callbackUrl: 'http://localhost:3000/signin/google/callback'
      }
    }
  },

  test: {
    app: {
      port: 3001
    },
    mongo: {
      url: 'mongodb://localhost:27017/nautilus-test'
    }
  },

  production: {
    app: {
      port: process.env.PORT || 3000,
      cacheTime: 7 * 24 * 60 * 60 * 1000 /* default caching time (7 days) for static files, calculated in milliseconds */
    },
    mongo: {
      url: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/koan'
    },
    oauth: {
      facebook: {
        clientId: '231235687068678',
        clientSecret: process.env.FACEBOOK_SECRET || '4a90381c6bfa738bb18fb7d6046c14b8',
        callbackUrl: 'https://koan.herokuapp.com/signin/facebook/callback'
      },
      google: {
        clientId: '147832090796-ckhu1ehvsc8vv9nso7iefvu5fi7jrsou.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_SECRET || 'MGOwKgcLPEfCsLjcJJSPeFYu',
        callbackUrl: 'https://koan.herokuapp.com/signin/google/callback'
      }
    }
  }
};

// override the base configuration with the platform specific values
module.exports = _.merge(baseConfig, platformConfig[baseConfig.app.env || (baseConfig.app.env = 'development')]);
