import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip, createUnzip } from 'zlib';

export const compressFile = (currentDir, src, dest) => {
    const srcPath = path.resolve(currentDir, src);
    const destPath = path.resolve(currentDir, dest);
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);
    const gzip = createGzip();

    readStream.pipe(gzip).pipe(writeStream);
    writeStream.on('finish', () => console.log('File compressed successfully.'));
    writeStream.on('error', () => console.log('Operation failed: Unable to compress file.'));
};

export const decompressFile = (currentDir, src, dest) => {
    const srcPath = path.resolve(currentDir, src);
    const destPath = path.resolve(currentDir, dest);
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);
    const unzip = createUnzip();

    readStream.pipe(unzip).pipe(writeStream);
    writeStream.on('finish', () => console.log('File decompressed successfully.'));
    writeStream.on('error', () => console.log('Operation failed: Unable to decompress file.'));
};