import { promises as fsPromises } from 'fs';
import { Record, records } from './imgData';

const jsonFilePath = './output/cache.json';

const createJsonFile = async () => {
    fsPromises.writeFile(jsonFilePath, '[]', 'utf-8');
};

const cacheImg = async (
    requestedAddress: string,
    resizedImgPath: string
): Promise<void> => {
    const arr: Record[] = await records;
    arr.push({
        addr: requestedAddress,
        pth: resizedImgPath,
    });
    fsPromises.writeFile(jsonFilePath, JSON.stringify(arr), 'utf-8');
};

const readCache = async (): Promise<Record[]> => {
    const cacheFile = await fsPromises.readFile(jsonFilePath, 'utf-8');
    const jsonArr = JSON.parse(cacheFile);
    return jsonArr;
};

const checkCached = (requestedAddress: string, records: Record[]): unknown => {
    for (let i = 0; i < records.length; i++) {
        return records[i].addr == requestedAddress ? records[i].pth : false;
    }
};

export { cacheImg, checkCached, readCache, createJsonFile };
