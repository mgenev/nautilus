/**
 * Trip.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    user: {
      model: 'user'
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    startDate: {
      type: 'datetime'
    },
    endDate: {
      type: 'datetime'
    },
    locations: {
      type: 'array'
    },
    tags: {
      type: 'array'
    },
    photos: {
      collection: 'photo'
    }
  }
};
