import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import fs from 'fs/promises';

export const readFile = async (currentDir, filePath) => {
    const fullPath = path.resolve(currentDir, filePath);
    try {
        const fileStat = await fs.stat(fullPath);
        if (fileStat.isFile()) {
            const readStream = createReadStream(fullPath, 'utf8');
            readStream.on('data', chunk => console.log(chunk));
            readStream.on('error', () => console.log('Operation failed: Unable to read file.'));
        } else {
            console.log('Operation failed: Not a file.');
        }
    } catch (error) {
        console.log('Operation failed: File does not exist.');
    }
};
