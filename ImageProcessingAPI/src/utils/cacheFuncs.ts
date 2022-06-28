import { promises as fsPromises } from 'fs';
import { Record, records } from './imgData';

const jsonFilePath = './output/cache.json';

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

const dropCached = async (idx: number): Promise<void> => {
    const arr = await records;
    arr.splice(idx, 1);
    fsPromises.writeFile(jsonFilePath, JSON.stringify(arr), 'utf-8');
};

const readCache = async (): Promise<Record[]> => {
    const cacheFile = await fsPromises.readFile(jsonFilePath, 'utf-8');
    const jsonArr = JSON.parse(cacheFile);
    return jsonArr;
};

const searchCached = (
    requestedAddress: string,
    records: Record[]
): number | undefined => {
    for (let i = 0; i < records.length; i++) {
        if (records[i].addr == requestedAddress) {
            return i;
        }
    }
    return -1;
};

const getCached = (
    requestedAddress: string,
    records: Record[]
): Record | undefined => {
    const cachedIdx = searchCached(requestedAddress, records);
    if (cachedIdx != -1) {
        return records[cachedIdx as number];
    }
};

export { cacheImg, dropCached, searchCached, getCached, readCache };
