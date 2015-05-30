/**
* Status.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        // relationships
        user: {
            model: 'user'
        },
        
        // attr
        note: {
            type: 'string',
            required: true
        },
        state: {
            type: 'string'
        },
        activity: {
            type: 'string'
        }
    }
};

