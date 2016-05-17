const _ = require('lodash');

module.exports.priceList = [{
        name: 'apple'
    }, {
        name: 'orange'
    }, {
        name: 'banana'
    }
];
module.exports.products = _.map(this.priceList, 'name');
