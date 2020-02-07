const cds = require('@sap/cds')
const fetch = require('node-fetch')
const https = require('https');

const { Orders } = cds.entities

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

module.exports = cds.service.impl(function() {
    this.before ('CREATE', 'Orders', object => {
        let order = object.data

        // Discount and NetPayable computation happens here.
        // As of now, the return values are randomly generated
        order.discount = Math.floor(Math.random() * 20)
        order.netPayable = Math.floor(Math.random() * 50)
    })

})
    