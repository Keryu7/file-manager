import os from 'os';

export const getEOL = () => {
    console.log(`EOL: ${JSON.stringify(os.EOL)}`);
};

export const getCpus = () => {
    const cpus = os.cpus();
    cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: ${cpu.model}, ${cpu.speed}MHz`);
    });
};

export const getHomeDir = () => {
    console.log(`Home Directory: ${os.homedir()}`);
};

export const getUsername = () => {
    console.log(`Current User: ${os.userInfo().username}`);
};

export const getArchitecture = () => {
    console.log(`CPU Architecture: ${os.arch()}`);
};