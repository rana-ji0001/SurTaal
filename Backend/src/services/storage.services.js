const {ImageKit} = require('@imagekit/nodejs');

const imageKitclient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY // This is the default and can be omitted
});

async function uploadFile(file) {
    const result = await imageKitclient.files.upload({
        file,
        fileName: 'music' + Date.now(),
        folder:"SurTaal/songs"
    });
    return result

}

module.exports = {uploadFile}