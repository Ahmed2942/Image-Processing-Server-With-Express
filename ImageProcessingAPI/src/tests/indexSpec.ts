import supertest from 'supertest';
import app from '../index';
import { createJsonFile } from '../utils/cacheFuncs';

// make cache file empty
createJsonFile();

const request = supertest(app);

describe('Testing responses by', async () => {
    it('checking our endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toEqual(200);
    });
    it('checking if image parameteres and their values were entered right', async () => {
        const response = await request.get('/image?filename=&width=');
        expect(response.status).toEqual(400);
    });
    it('checking if image is on server', async () => {
        const response = await request.get('/image?filename=image6');
        expect(response.status).toEqual(404);
    });
    it('checking if caching is working', async () => {
        /* eslint-disable */
        const response1 = await request.get('/image?filename=image3&width=100');
        const response2 = await request.get('/image?filename=image3&width=100');
        expect(response2.status).toEqual(304);
    });
    it('checking if image was processed successfully on server', async () => {
        const response = await request.get('/image?filename=image3');
        expect(response.status).not.toEqual(500);
    });
});
 describe('Testing if image processing was done by', async () => {
    it('checking if server returns 200 when we provide only width', async () => {
        const response = await request.get('/image?filename=image2&width=300');
        expect(response.status).toEqual(200);
    });
    it('checking if server returns 200 when we provide only height', async () => {
        const response = await request.get('/image?filename=image2&height=300');
        expect(response.status).toEqual(200);
    });
    it('checking if server returns 200 when we provide width and height', async () => {
        const response = await request.get('/image?filename=image2&width=300&height=300');
        expect(response.status).toEqual(200);
    });
 })