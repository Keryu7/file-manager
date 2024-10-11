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

export const createFile = async (currentDir, fileName) => {
    const fullPath = path.resolve(currentDir, fileName);
    try {
        await fs.writeFile(fullPath, '');
        console.log('File created successfully.');
    } catch (err) {
        console.log('Operation failed: Unable to create file.');
    }
};

export const renameFile = async (currentDir, oldName, newName) => {
    const oldPath = path.resolve(currentDir, oldName);
    const newPath = path.resolve(currentDir, newName);
    try {
        await fs.rename(oldPath, newPath);
        console.log('File renamed successfully.');
    } catch (err) {
        console.log('Operation failed: Unable to rename file.');
    }
};

export const copyFile = async (currentDir, src, dest) => {
    const srcPath = path.resolve(currentDir, src);
    const destPath = path.resolve(currentDir, dest);
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);

    readStream.pipe(writeStream);
    writeStream.on('finish', () => console.log('File copied successfully.'));
    writeStream.on('error', () => console.log('Operation failed: Unable to copy file.'));
};

export const moveFile = async (currentDir, src, dest) => {
    const srcPath = path.resolve(currentDir, src);
    const destPath = path.resolve(currentDir, dest);
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);

    readStream.pipe(writeStream);
    writeStream.on('finish', async () => {
        try {
            await fs.unlink(srcPath);
            console.log('File moved successfully.');
        } catch (err) {
            console.log('Operation failed: Unable to move file.');
        }
    });
    writeStream.on('error', () => console.log('Operation failed: Unable to copy file.'));
};

export const deleteFile = async (currentDir, filePath) => {
    const fullPath = path.resolve(currentDir, filePath);
    try {
        await fs.unlink(fullPath);
        console.log('File deleted successfully.');
    } catch (err) {
        console.log('Operation failed: Unable to delete file.');
    }
};