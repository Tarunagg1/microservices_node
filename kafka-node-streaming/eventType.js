const avro = require('avsc');

const type = avro.Type.forSchema({
    name: 'Pet',
    fields: [
        {
            name: 'kind',
            type: { type: 'enum', name: 'PetKind', symbols: ['CAT', 'DOG'] }
        },
        { name: 'name', type: 'string' }
    ]
});


module.exports = type;