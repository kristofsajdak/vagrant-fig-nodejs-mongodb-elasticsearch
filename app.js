var fortune = require('fortune')
    , app = fortune({
        adapter: 'mongodb',
        host: process.env.DB_PORT_27017_TCP_ADDR,
        db: 'petstore'
    })
        .resource('person', {
            name: String,
            age: Number,
            pets: ['pet'] // "has many" relationship to pets
        })
        .resource('pet', {
            name: String,
            age: Number,
            owner: 'person' // "belongs to" relationship to a person
        })
        .listen(process.env.PORT);
