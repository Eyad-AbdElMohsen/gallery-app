import { Router } from 'express';
import { Photo, saveNewPhoto } from '../models/photo.model';
import multer from 'multer';
import path from 'path';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const photos = await Photo.find();
        res.render('index', { photos });
    } catch (err) {
        console.error(err);
        next(err)
    }
})

router.post('/',
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.join(__dirname, '..', 'uploaded-imgs'));
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            },
        }),
    }).single('file'), // For file upload

    async (req, res, next) => {
        try {
            if(req.file){
                await saveNewPhoto(req.file.filename, req.body.title)
            }
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err)
        }
    }
)

export default router;