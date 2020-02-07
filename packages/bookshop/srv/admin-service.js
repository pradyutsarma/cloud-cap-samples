const cds = require('@sap/cds')
const fetch = require('node-fetch')
const https = require('https');

const { Orders } = cds.entities
const  { Webhooks } = cds.entities

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

module.exports = cds.service.impl(function() {
    
    this.before (['CREATE'], 'Orders', async (object) => {

        const hooks = cds.run (SELECT.from(Webhooks)).then((urls) => {

            let order = object.data

            // We support only one webhook in the system now
            if (urls.length === 0) {
                throw new Error (`No webhook registered`)
            }

            let url = new URL(urls[0].url)

            let fetchOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify ({
                    "ID": order.ID,
                    "createdAt": order.createdAt,
                    "createdBy": order.createdBy,
                    "OrderNo": order.OrderNo,
                    "Items": order.Items
                })
            }
            // HTTPSAgent to ignore ssl errors
            if (url.protocol == "https:") {
                fetchOptions.agent = httpsAgent                
            }

            fetch (urls[0].url, fetchOptions).then ((res) => {
                return res.json()
            }).then ((data) => {
                order.netPayable = data.netPayable
                return UPDATE(Orders).set('netPayable = ', data.netPayable).where({ID:order.ID})
            }).catch((err) => {
                throw new Error (`Error while sending order create event to Kyma with \n ${err}`)
            })
        })

    })
})
    