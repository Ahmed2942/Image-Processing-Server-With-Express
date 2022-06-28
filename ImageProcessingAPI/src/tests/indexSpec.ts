import supertest from 'supertest';
import app from '../index';
import path from 'path';
import { searchCached, cacheImg, dropCached } from '../utils/cacheFuncs';
import { records } from '../utils/imgData';
import { existsSync, unlinkSync } from 'fs';
import { resizeImg } from '../utils/imgFuncs';

const request = supertest(app);

describe('Testing responses by', async (): Promise<void> => {
    it('checking our endpoint', async (): Promise<void> => {
        const response = await request.get('/');
        expect(response.status).toEqual(200);
    });
    it('checking if image parameteres and their values were entered right', async (): Promise<void> => {
        const response = await request.get('/image?filename=&width=');
        expect(response.status).toEqual(400);
    });
    it('checking if image is on server', async (): Promise<void> => {
        const response = await request.get('/image?filename=image6');
        expect(response.status).toEqual(404);
    });
    it('checking if caching is working', async (): Promise<void> => {
        /* eslint-disable */
        const response1 = await request.get('/image?filename=image3&width=100');
        const response2 = await request.get('/image?filename=image3&width=100');
        expect(response2.status).toEqual(304);
    });
    it('checking if image was processed successfully on server', async (): Promise<void> => {
        const response = await request.get('/image?filename=image3');
        expect(response.status).not.toEqual(500);
    });
});
describe('Testing if image processing was done by', async (): Promise<void> => {
    it('checking if the resized image is created on server', async (): Promise<void> => {
        const requestedAddress = '/image?filename=image3&width=300&height=300';
        const imgName = 'image3';
        const imgPath = path.resolve(`./images/${imgName}.jpg`);
        const width = 300;
        const height = 300;
        // check if it's cached and delete it to get it fresh resized
        const cachedIdx = searchCached(
            requestedAddress,
            await records
        ) as number;
        const cached = (await records)[cachedIdx];
        if (cached) {
            console.log('there');
            const cachedPath = cached.pth;
            // delete cached
            unlinkSync(cachedPath);
            dropCached(cachedIdx);
            // re-resize image
            const resizedImgPath = await resizeImg(
                imgName,
                imgPath,
                width,
                height
            );
            cacheImg(requestedAddress, resizedImgPath);
            expect(existsSync(resizedImgPath)).toBe(true);
        } else {
            const resizedImgPath = await resizeImg(
                imgName,
                imgPath,
                width,
                height
            );
            cacheImg(requestedAddress, resizedImgPath);
            expect(existsSync(resizedImgPath)).toBe(true);
        }
    });
    it('checking if server returns 200 when we provide only width', async (): Promise<void> => {
        const response = await request.get('/image?filename=image2&width=300');
        expect(response.status == 200 || response.status == 304).toBe(true);
    });
    it('checking if server returns 200 when we provide only height', async (): Promise<void> => {
        const response = await request.get('/image?filename=image2&height=300');
        expect(response.status == 200 || response.status == 304).toBe(true);
    });
    it('checking if server returns 200 when we provide width and height', async (): Promise<void> => {
        const response = await request.get(
            '/image?filename=image2&width=300&height=300'
        );
        expect(response.status == 200 || response.status == 304).toBe(true);
    });
});
