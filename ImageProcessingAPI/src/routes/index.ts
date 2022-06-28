import { Router, Request, Response } from 'express';
import image_route from './api/image';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.send('Hello there!');
});

routes.use('/image', image_route);

export default routes;
