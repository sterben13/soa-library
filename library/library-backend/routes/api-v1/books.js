const express = require('express');
const CRUD = require('../../models/database/db-interface').BookCRUD;
const router = express.Router();
const multer = require('multer'); // v1.0.5
const upload = multer();
var uploading = multer({
    dest: './public/images/covers/'
    , limits: {
        fileSize: 1000000
        , files: 1
    }
, });
router
//
    .get('/', function (req, res, next) {
        CRUD.findAll(function (error, docs) {
            if (error) {
                console.log(error);
                return;
            }
            res.status(200).json(docs);
        });
    })
    //
    .get('/:id', function (req, res, next) {
        CRUD.findById(req.params.id, function (error, docs) {
            if (error) {
                console.log(error);
                return;
            }
            res.status(200).json(docs[0]);
        });
    })
    //
    .post('/', uploading.single('cover'), function (req, res) {
        if (req.file) 
            req.body.cover_photo = '/' + req.file.path;
    
        CRUD.insert(req.body, (error) => {
            if (error) {
                console.log(error);
                res.status(500).end();
                return;
            }
            res.status(200).end();
        });
    })
    //
    .put('/:id', uploading.single('cover'), (req, res) => {
        if (req.file) 
            req.body.cover_photo = '/' + req.file.path;
        
        CRUD.update(req.params.id, req.body, (error, doc) => {
            if (error) {
                console.log(error);
                res.status(500).end();
                return;
            }
            res.status(200).json(doc);
        });
    })
    //
    .delete('/:id', (req, res) => {
        CRUD.delete(req.params.id, (error) => {
            if (error) {
                console.log(error);
                res.status(500).end();
                return;
            }
            res.status(200).end();
        });
    });
module.exports = router;