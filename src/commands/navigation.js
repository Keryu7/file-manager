import path from 'path';
import os from 'os';
import fs from 'fs/promises';

export const changeDirUp = async (currentDir) => {
    const parentDir = path.dirname(currentDir);
    return currentDir === os.homedir() ? currentDir : parentDir;
};

export const changeDir = async (currentDir, newDir) => {
    const newPath = path.resolve(currentDir, newDir);
    try {
        const fileStat = await fs.stat(newPath);
        if (fileStat.isDirectory()) {
            return newPath;
        } else {
            console.log('Invalid Folder');
            return currentDir;
        }
    } catch (error) {
        console.log('Invalid Folder');
        return currentDir;
    }
};

export const listFiles = async (currentDir) => {
    try {
        const files = await fs.readdir(currentDir);
        const list = [];

        for (const file of files) {
            const fullPath = path.join(currentDir, file);
            const fileStat = await fs.stat(fullPath);
            if (fileStat.isDirectory()) {
                list.push({ name: file, type: 'DIR' });
            }
            if (fileStat.isFile()) {
                list.push({ name: file, type: 'FILE' });
            }
        }

        list.sort((a, b) => {
            if (a.type === b.type) {
                return a.name.localeCompare(b.name);
            }
            return a.type === 'DIR' ? -1 : 1;
        });

        console.log('Index'.padEnd(7) + 'Name'.padEnd(30) + 'Type'.padEnd(10));
        console.log('-'.repeat(50));

        list.forEach((folder, index) => {
            console.log(index.toString().padEnd(7) + folder.name.padEnd(30) + folder.type.padEnd(10));
        });
    } catch (error) {
        console.log('Operation failed: Unable to list files.', error.message);
    }
};