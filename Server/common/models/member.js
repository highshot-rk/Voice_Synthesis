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

module.exports = function(Member) {

    var uploadedFileName = '';
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // checking and creating uploads folder where files will be uploaded
            var dirPath = 'client/uploads/uservoice'
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

    Member.Uploadvoice = function (req, res, userId, cb) {
        var upload = multer({
            storage: storage
        }).array('media', 12);
        // let userId = userId;
        upload(req, res, function (err, ...params) {
        let files = req.files;
        let voiceoriginalname = files[0].originalname;
        let voicefilename = files[0].filename;
            if (err) {
                cb(null, {res: "res"});
            } else {
                Member.findById(userId, function (err, member){
                    member.voiceoriginalname = voiceoriginalname;
                    member.voicefilename = voicefilename;
                    return member.save(function (err, memberSaved){
                        cb(null, memberSaved);
                    })
                })
            }
        })
    };

    Member.remoteMethod('Uploadvoice', {
        http: { path: '/uploadvoice', verb: 'post', },
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
                arg: 'userId',
                type: 'object',
            }
        ],
        returns: { arg: 'result', type: 'object', },
    });
};
