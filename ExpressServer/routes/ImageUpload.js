const express = require('express');
const bodyparser = require('body-parser');
const multer = require('multer');

const ImageRouter = express.Router();

ImageRouter.use(bodyparser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const filefilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
        cb(new Error('File must be ImageFile.'), false);
    }
    cb(null, true);
}

const ImageUpload = multer({ storage: storage, fileFilter: filefilter });

ImageRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false, status: 'Cannot perform get Operation on Images!'});
})
.post(ImageUpload.single('ImageFile'), (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false, status: 'Cannot perform put Operation on Images!'});
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false, status: 'Cannot perform delete Operation on Images!'});
})

module.exports = ImageRouter;