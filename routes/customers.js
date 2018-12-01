const errors = require('restify-errors');
const Customer = require('../models/Customer');

module.exports = server => {
    // GET Customers
    server.get('/customers', async (req, res, next) => {
        try {
            // fetch all customers from DB
            const customers = await Customer.find({});
            res.send(customers);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    // GET a single customer
    server.get('/customers/:id', async (req, res, next) => {
        try {
            // fetch one customer from DB
            const customer = await Customer.findById(req.params.id);
            res.send(customer);
            next();
        } catch (err) {
            return next(
                new errors.ResourceNotFoundError(
                    `There is no customer found with the id of ${req.params.id}`
                )
            );
        }
    });

    // ADD Customers
    server.post('/customers', async (req, res, next) => {
        // Check if the content is of type JSON
        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'Application/JSON'")
            );
        }

        const { name, email, balance } = req.body;

        const customer = new Customer({ name, email, balance });

        try {
            const newCustomer = await customer.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }
    });

    // UPDATE customers
    server.put('/customers/:id', async (req, res, next) => {
        // Check if the content is of type JSON
        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'Application/JSON'")
            );
        }
        try {
            const customer = await Customer.findOneAndUpdate(
                { _id: req.params.id },
                req.body
            );
            res.send(200);
            next();
        } catch (err) {
            return next(
                new errors.ResourceNotFoundError(
                    `There is no customer found with the id of ${req.params.id}`
                )
            );
        }
    });

    // DELETE customers
    server.del('/customers/:id', async (req, res, next) => {
        try {
            const customer = await Customer.findOneAndDelete({
                _id: req.params.id
            });
            res.send(204);
            next();
        } catch (err) {
            return next(
                new errors.ResourceNotFoundError(
                    `There is no customer found with the id of ${req.params.id}`
                )
            );
        }
    });
};
