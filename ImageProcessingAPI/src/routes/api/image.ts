import { Router, Request, Response } from 'express';
import {
    resizeImg,
    resizeImgWidth,
    resizeImgHeight,
} from '../../utils/imgFuncs';
import { imgNames, records } from '../../utils/imgData';
import path from 'path';
import { cacheImg, checkCached } from '../../utils/cacheFuncs';

const image_route = Router();

image_route.get('/', async (req: Request, res: Response) => {
    try {
        const requestedAddress = req.url;
        const imgName = req.query.filename as string;
        const imgPath = path.resolve(`./images/${imgName}.jpg`);
        const width = req.query.width as string;
        const height = req.query.height as string;
        const widthNum = parseInt(width);
        const heightNum = parseInt(height);
        // if image name parameter was not provided
        if (imgName == undefined) {
            return res
                .status(400)
                .send('Bad request, Please enter "filename" parameter!');
        }
        if (imgName == '') {
            return res
                .status(400)
                .send('Bad request, Please enter a valid image name!');
        }
        // if image was not found on server
        if (imgNames.includes(imgName) == false) {
            return res.status(404).send('Image not found');
        }
        // if image name was provided but width and height parameter was not provided
        if (width == undefined && height == undefined) {
            return res.status(200).sendFile(imgPath);
        }
        // if image is cached
        const cached = checkCached(requestedAddress, await records);
        if (cached) {
            return res.status(304).sendFile(cached as string);
        }
        // if width provided but not height
        if (width == undefined) {
            const resizedImgPath = await resizeImgHeight(
                imgName,
                imgPath,
                heightNum
            );
            cacheImg(requestedAddress, resizedImgPath);
            return res.sendFile(resizedImgPath);
        }
        // if height provided but not width
        if (height == undefined) {
            const resizedImgPath = await resizeImgWidth(
                imgName,
                imgPath,
                widthNum
            );
            cacheImg(requestedAddress, resizedImgPath);
            return res.sendFile(resizedImgPath);
        }
        // if width was not entered properly
        if (width == '' || isNaN(widthNum)) {
            return res
                .status(400)
                .send('Bad request, Please enter a valid width!');
        }
        // if height was not entered properly
        if (height == '' || isNaN(heightNum)) {
            return res
                .status(400)
                .send('Bad request, Please enter a valid height!');
        }
        const resizedImgPath = await resizeImg(
            imgName,
            imgPath,
            widthNum,
            heightNum
        );
        cacheImg(requestedAddress, resizedImgPath);
        return res.status(200).sendFile(resizedImgPath);
    } catch (error) {
        return res.status(500).send('server error');
    }
});

export default image_route;
