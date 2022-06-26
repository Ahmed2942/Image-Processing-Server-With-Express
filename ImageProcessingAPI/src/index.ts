import express from 'express';
import path from 'path';
import sharp from 'sharp';

const app = express();
const port = 3000;

const imgNames: string[] = ['image1', 'image2', 'image3', 'image4', 'image5'];

// create interface for making objects that has data on cached images
interface Record {
  addr: string;
  pth: string;
}
// create array for caching
const records: Record[] = [];

app.listen(port, () => {
  /* eslint-disable */
  console.log(`Server is starting at port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello there!');
});

app.get('/image', async (req, res) => {
  try {
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
    for (let i = 0; i < records.length; i++) {
      if (records[i].addr == req.url) {
        return res.status(304).sendFile(records[i].pth);
      }
    }
    // if width provided but not height
    if (width == undefined) {
      const resizedImgPath = path.resolve(
        `./output/${imgName}-${width}-${height}.jpg`
      );
      await sharp(imgPath)
        .resize({
          height: heightNum,
        })
        .toFile(resizedImgPath);
      records.push({
        addr: req.url,
        pth: resizedImgPath,
      });
      return res.sendFile(resizedImgPath);
    }
    // if height provided but not width
    if (height == undefined) {
      const resizedImgPath = path.resolve(
        `./output/${imgName}-${width}-${height}.jpg`
      );
      await sharp(imgPath)
        .resize({
          width: widthNum,
        })
        .toFile(resizedImgPath);

      records.push({
        addr: req.url,
        pth: resizedImgPath,
      });
      return res.sendFile(resizedImgPath);
    }
    // if width was not entered properly
    if (width == '' || isNaN(widthNum)) {
      return res.status(400).send('Bad request, Please enter a valid width!');
    }
    // if height was not entered properly
    if (height == '' || isNaN(heightNum)) {
      return res.status(400).send('Bad request, Please enter a valid height!');
    }
    const resizedImgPath = path.resolve(
      `./output/${imgName}-${width}-${height}.jpg`
    );
    await sharp(imgPath)
      .resize({ width: widthNum, height: heightNum })
      .toFile(`./output/${imgName}.jpg`);
    records.push({
      addr: req.url,
      pth: resizedImgPath,
    });
    return res.status(200).sendFile(resizedImgPath);
  } catch (error) {
    return res.status(500).send('server error');
  }
});

export default app;
