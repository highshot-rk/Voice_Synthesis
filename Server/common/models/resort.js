// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

/*!
 * Module Dependencies.
 */

'use strict';
var multer = require('multer');
var fs = require('fs');
// const Member = require('./Member');
var app = require('../../server/server');
module.exports = function(Resort) {

    var uploadedFileName = '';
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // checking and creating uploads folder where files will be uploaded
            var dirPath = 'client/uploads/resort'
            if (!fs.existsSync(dirPath)) {
                var dir = fs.mkdirSync(dirPath);
            }
            cb(null, dirPath + '/');
        },
        filename: function (req, file, cb) {
            // file will be accessible in `file` variable
            var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
            var fileName = Date.now() + ext;
            uploadedFileName = fileName;
            cb(null, fileName);
        }
    });

    Resort.getResorts = function (memberId, cb) {
        Resort.find(
            function (err, data) {
                if (err) {
                    return cb(err);
                }

                if (memberId === undefined)
                {
                    for (var i = data.length - 1; i > -1 ; i--)
                    {
                        if (data[i]["memberId"])
                        {
                            data.splice(i, 1);
                        }
                    }
                }
                else
                {
                    for (var i = data.length - 1; i > -1 ; i--)
                    {
                        if (data[i]["memberId"] && data[i]["memberId"] != memberId)
                        {
                            data.splice(i, 1);
                        }
                    }
                }
                
                cb(null, data);
            }
        );
    };

    Resort.remoteMethod('getResorts', {
        http: { path: '/getResorts', verb: 'get', },
        description: ['Description of the endpoint.',],
        accepts: [
            { arg: 'inputVariable', type: 'string', },
        ],
        returns: { arg: 'result', type: 'string', },
    });

    Resort.ResortUsers = function (cb) {
        Resort.find({
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

    Resort.remoteMethod('ResortUsers', {
        http: { path: '/ResortUsers', verb: 'get', },
        description: ['Description of the endpoint.',],
        accepts: [
        ],
        returns: { arg: 'result', type: 'object', },
    })

    Resort.UploadMedia = function ( req, res, extraInfo, cb) {
        var upload = multer({
            storage: storage
        }).array('media', 12);
        // console.log(extraInfo);
        let userId = extraInfo.userId;
        let paymethod = extraInfo.paymethod;
        let tag = extraInfo.tag;
        upload(req, res, function (err, ...params) {
            let files = req.files;
            // console.log(files[0].originalname);
            let imageoriginalname = files[0].originalname;
            let imagefilename = files[0].filename;
            let videooriginalname = files[1].originalname;
            let videofilename = files[1].filename;
            if (err) {
                    cb(null, {res: "res"});
            } else {
                Resort.create({
                    imageOriginal: imageoriginalname,
                    imageFile: imagefilename,
                    videoOriginal: videooriginalname,
                    videoFile: videofilename,
                    tag: tag,
                    freeType: paymethod,
                    memberId: userId
                })
                .then((res)=>{
                    var Member = app.models.Member;
                    let firstName = '';
                    let lastName = '';
                    let email = '';
                    let member = {};
                    let resData = {};
                    Member.find({where: {id: userId}})
                        .then(response=>{
                            firstName = response[0].firstName;
                            lastName = response[0].lastName;
                            email = response[0].email;
                            member.id = userId;
                            member.firstName = firstName;
                            member.lastName = lastName;
                            member.email = email;
                            resData.member = member;
                            resData.resort = res;
                            // console.log(resData);
                            cb(null, resData);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
            }
        });
    };

    Resort.remoteMethod('UploadMedia', {
        http: { path: '/uploadMedia', verb: 'post', },
        description: ['Description of the endpoint.',],
        accepts: [
            {
                arg: 'req',
                type: 'object',
                http: {
                    source: 'req'
                }
            },
            {
                arg: 'res',
                type: 'object',
                http: {
                    source: 'res'
                }
            },
            {
                arg: 'extraInfo',
                type: 'object',
            }
        ],
        returns: { arg: 'result', type: 'object', },
    })
};
