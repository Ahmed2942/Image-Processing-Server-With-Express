import { readCache } from './cacheFuncs';

const imgNames: string[] = ['image1', 'image2', 'image3', 'image4', 'image5'];

// create interface for making objects that has data on cached images
interface Record {
    addr: string;
    pth: string;
}

// create array for caching
// const records: Record[];

const records: Promise<Record[]> = readCache().then((records) => {
    return records;
});

export { imgNames, Record, records };
