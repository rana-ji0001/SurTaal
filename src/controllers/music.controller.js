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
        artist: req.user.id,
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
        artist: req.user.id,
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


async function getAllMusics(req,res) {
    const musics = await musicModel.find().populate("artist", "username email");

    res.status(200).json({
        message:"Here are all the musics",
        musics:musics
    })
    
}
async function getAllAlbums(req,res) {
    const albums = await albumModel.find().select("title artist").populate("artist", "username email");
    //we only get albums with this function and no music will be shown in that album for to show music we need to create another route
    res.status(200).json({
        message:"Here are the albums",
        albums:albums
    })
    
}



async function getAllAlbumById(req,res) {
    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate("artist","username email").populate("musics");

    res.status(200).json({
        message:"Here are the songs from This Album",
        album:album
    })
    
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAllAlbumById }