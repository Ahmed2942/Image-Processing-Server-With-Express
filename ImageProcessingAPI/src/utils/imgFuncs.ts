import path from 'path';
import sharp from 'sharp';

const resizeImg = async (
    imgName: string,
    imgPath: string,
    width: number,
    height: number
): Promise<string> => {
    const resizedImgPath = path.resolve(
        `./output/${imgName}-${width}-${height}.jpg`
    );
    await sharp(imgPath)
        .resize({ width: width, height: height })
        .toFile(resizedImgPath);
    return resizedImgPath;
};

const resizeImgWidth = async (
    imgName: string,
    imgPath: string,
    width: number
): Promise<string> => {
    const resizedImgPath = path.resolve(`./output/${imgName}-${width}.jpg`);
    await sharp(imgPath)
        .resize({
            width: width,
        })
        .toFile(resizedImgPath);
    return resizedImgPath;
};
const resizeImgHeight = async (
    imgName: string,
    imgPath: string,
    height: number
): Promise<string> => {
    const resizedImgPath = path.resolve(`./output/${imgName}-${height}.jpg`);
    await sharp(imgPath)
        .resize({
            height: height,
        })
        .toFile(resizedImgPath);
    return resizedImgPath;
};

export { resizeImg, resizeImgWidth, resizeImgHeight };
