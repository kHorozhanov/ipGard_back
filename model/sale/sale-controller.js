var Controller = require('../../lib/controller');
var Sale = require('./sale-facade');
var Document = require('./../document/document-facade');
var async = require('async');

class SaleController extends Controller {

    find(req, res, next) {
        let options = {};
        if (req.query.sort) {
            options.sort = req.query.sort;
            delete req.query.sort;
        }
        if (req.query.page) {
            options.page = +req.query.page;
            delete req.query.page;
        }
        if (req.query.limit) {
            options.limit = +req.query.limit;
            delete req.query.limit;
        }
        let query = {};
        if (req.query) {
            for (let key in req.query) {
                if(key !== 'product') {
                    query[key] = new RegExp('^' + req.query[key]);
                } else {
                    query[key] = req.query[key];
                }
            }
        }
        return this.model.paginate(query, options)
            .then(collection => res.status(200).json(collection))
            .catch(err => next(err));
    }
}

module.exports = new SaleController(Sale);