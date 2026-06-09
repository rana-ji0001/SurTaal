const musicModel = require('../models/music.model');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.services');
const bcrypt = require('bcryptjs')




async function createMusic(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "artist") {
            return res.status(400).json({ messsage: "You Have no access to this feature" })
        }


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
    } catch (error) {
        console.log("ERROR:", error);

        return res.status(500).json({
            message: error.message
        });

    }
}


module.exports = { createMusic }