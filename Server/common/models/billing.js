// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

/*!
 * Module Dependencies.
 */

'use strict';


module.exports = function(Billing) {
    Billing.BillingUsers = function (cb) {
        Billing.find({
            "include": {
                "relation": "member",
                "scope": {
                  "fields": [
                    "firstName",
                    "lastName",
                    "email"
                  ]
                },
              }
            }).then((res) => {
                cb(null, res);
        })
    };

    Billing.remoteMethod('BillingUsers', {
        http: { path: '/BillingUsers', verb: 'get', },
        description: ['Description of the endpoint.',],
        accepts: [
        ],
        returns: { arg: 'result', type: 'object', },
    })
};
