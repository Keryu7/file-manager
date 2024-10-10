import os from 'os';
import readline from 'readline';
import { greetUser, printCurrentDir, exitProgram } from './utils.js';
import { changeDir, changeDirUp, listFiles } from './commands/navigation.js';
import { copyFile, createFile, deleteFile, moveFile, readFile, renameFile } from './commands/files.js';
import { hashFile } from './commands/hash.js';
import { compressFile, decompressFile } from './commands/compress.js';
import {
    getEOL,
    getCpus,
    getHomeDir,
    getUsername,
    getArchitecture,
} from './commands/os-info.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const homeDir = os.homedir();
let currentDir = homeDir;
const username = process.argv.find(arg => arg.startsWith('--username=')).split('=')[1];

greetUser(username);
printCurrentDir(currentDir);

rl.on('line', (input) => {
    const [command, ...args] = input.trim().split(' ');

    switch (command) {
        case 'up':
            changeDirUp(currentDir).then(dir => {
                currentDir = dir;
                printCurrentDir(currentDir);
            });
            break;
        case 'cd':
            changeDir(currentDir, args[0]).then(dir => {
                currentDir = dir;
                printCurrentDir(currentDir);
            });
            break;
        case 'ls':
            listFiles(currentDir).then(() => printCurrentDir(currentDir));
            break;
        case 'cat':
            readFile(currentDir, args[0]);
            break;
        case 'add':
            createFile(currentDir, args[0]);
            break;
        case 'rn':
            renameFile(currentDir, args[0], args[1]);
            break;
        case 'cp':
            copyFile(currentDir, args[0], args[1]);
            break;
        case 'mv':
            moveFile(currentDir, args[0], args[1]);
            break;
        case 'rm':
            deleteFile(currentDir, args[0]);
            break;
        case 'hash':
            hashFile(currentDir, args[0]);
            break;
        case 'compress':
            compressFile(currentDir, args[0], args[1]);
            break;
        case 'decompress':
            decompressFile(currentDir, args[0], args[1]);
            break;
        case 'os':
            if (args[0] === '--EOL') getEOL();
            else if (args[0] === '--cpus') getCpus();
            else if (args[0] === '--homedir') getHomeDir();
            else if (args[0] === '--username') getUsername();
            else if (args[0] === '--architecture') getArchitecture();
            break;
        case '.exit':
            exitProgram(username);
            break;
        default:
            console.log('Invalid input');
    }
});

rl.on('close', () => {
    exitProgram(username);
});