const fs = require('fs').promises;

const readFile = async (path) => {
    try {
        const data = await fs.readFile(path);
        return JSON.parse(data);
    } catch (error) {
        console.log(error.message);
    }
};

const writeFile = async (path, data) => {
    try {
        await fs.writeFile(path, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    readFile,
    writeFile,
};