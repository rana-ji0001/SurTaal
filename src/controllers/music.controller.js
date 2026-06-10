const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.services');
const bcrypt = require('bcryptjs');




async function createMusic(req, res) {

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: decoded.id,
    });

    res.status(200).json({
        message: "Music Created Successfully",
        id: music._id,
        uri: music.uri,
        title: music.title,
        artish: music.artist
    });
}

async function createAlbum(req, res) {
    const { title, musics } = req.body;

    const album = await albumModel.create({
        title,
        artist: decoded.id,
        musics: musics,

    });
    res.status(200).json({
        message: "You have Successfully created an album",
        album: {
            id: album._id,
            title: album.title,
            music: album.musics,
            artist: album.artist,
        }
    });


}

module.exports = { createMusic, createAlbum }