require('dotenv').config();
const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

// Using bodyParser plugin
server.use(restify.plugins.bodyParser());

// Protect all the routes except '/auth'
server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));

server.listen(config.PORT, () => {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.connect(
        config.MONGODB_URI,
        { useNewUrlParser: true }
    );
});

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
    require('./routes/users')(server);
    require('./routes/customers')(server);
    console.log(`Server running on port ${config.PORT}`);
});
