import DS from 'ember-data';

export default DS.Model.extend({
	// relationships
	vendor: DS.belongsTo('vendor'),

	// attr
    title: DS.attr('string'),
    filePath: DS.attr('string')
});
