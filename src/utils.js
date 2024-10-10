export const greetUser = (username) => {
    console.log(`Welcome to the File Manager, ${username}!`);
};

export const printCurrentDir = (currentDir) => {
    console.log(`You are currently in ${currentDir}`);
};

export const exitProgram = (username) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
};