const fs = require('fs');

async function newFile(path, data) {
    fs.writeFile(path, data);
}

async function deleteFile(path) {
    fs.unlink(path);
}

async function editFile(path, data) {

}


module.exports = {
    newFile,
    editFile,
    deleteFile,
};
