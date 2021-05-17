// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

/*!
 * Module Dependencies.
 */

'use strict';


module.exports = function(CryHistory) {
    CryHistory.CryHistoryUsers = function (cb) {
        CryHistory.find({
            "include": [
                {
                    "relation": "member",
                    "scope": {
                        "fields": [
                            "firstName",
                            "lastName",
                            "email"
                        ]
                    },
                },
                {
                    "relation": "resort",
                    "scope": {
                        "fields": [
                            "tag"
                        ]
                    },
                }
            ]
            }).then((res) => {
                cb(null, res);
        })
    };

    CryHistory.remoteMethod('CryHistoryUsers', {
        http: { path: '/CryHistoryUsers', verb: 'get', },
        description: ['Description of the endpoint.',],
        accepts: [
        ],
        returns: { arg: 'result', type: 'object', },
    })
};
