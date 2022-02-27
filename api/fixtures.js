const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const Task = require("./models/Task");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [jane, john, tugolbai] = await User.create({
        username: 'Jane'
    }, {
        username: 'John',
    }, {
        username: 'Tugolbai',
    });

    await Task.create({
        user: jane,
        title: 'Buy groceries',
        status: 'in_progress'
    }, {
        user: john,
        title: 'Go to car repairs',
        status: 'in_progress'
    },{
        title: 'Create a list of tasks',
        status: 'new'
    }, {
        user: tugolbai,
        title: 'Do homework',
        status: 'complete'
    });

    await mongoose.connection.close();
};

run().catch(e => console.error(e));