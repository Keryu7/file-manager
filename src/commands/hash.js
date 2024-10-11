import { createHash } from 'crypto';
import path from 'path';
import { createReadStream } from 'fs';

export const hashFile = (currentDir, filePath) => {
    const hash = createHash('sha256');
    const fullPath = path.resolve(currentDir, filePath);
    const readStream = createReadStream(fullPath);

    readStream.on('data', chunk => hash.update(chunk));
    readStream.on('end', () => console.log(`Hash: ${hash.digest('hex')}`));
    readStream.on('error', () => console.log('Operation failed: Unable to hash file.'));
};