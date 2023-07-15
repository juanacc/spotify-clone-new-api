const { request,response} = require('express');
const {getAll, saveTrack, findByIdAndUpdate, findByIdAndDelete} = require('../services/tracks');
const {success, error} = require('../helpers/response');
const Tracks = require('../models/tracks');

exports.getAll = async (req = request, res = response) => {
    const {userEmail} = req;
    //console.log('EMAIL: ', userEmail)    
    try {
        const tracks = await getAll(userEmail);
        //console.log('TRACKS', tracks);
        return res.status(200).json({data: tracks});
    } catch (error) {
        console.log(error);
        res.json(error(500,{
            ok: false,
            msg: 'unexpected error'
        }))
    }
}

exports.getSearch = async (req = request, res = response) => {
    const src = req.params.search;
    const regex = new RegExp(src, 'i');
    console.log('TERMINO DE BUSCA src', src);
    try {
        const [trackListArtist, trackListName, trackListAlbum] = await Promise.all([
            Tracks.find({artist: regex}),
            Tracks.find({name: regex}),
            Tracks.find({album: regex})
        ]);

        const tracks = [...trackListArtist, ...trackListName, ...trackListAlbum];
        //console.log('TRACKS', tracks);
        return res.status(200).json({data: tracks});
    } catch (error) {
        console.log(error);
        res.json(error(500,{
            ok: false,
            msg: 'unexpected error'
        }))
    }
}

exports.addTrack = async (req=request, res=response) => {
    const track = req.body;
    const userEmail = req.userEmail;
    
    try {        
        const newTrack = {
            name: track.name,
            album: track.album,
            cover: track.cover,
            artist: track.artist,
            url: `${process.env.URL_PUBLIC}/track-0.mp3`,
            userEmail: userEmail
        };
        const trackDB = new Tracks(newTrack);
        await saveTrack(trackDB);
        res.status(200).json({
            msg: "Store track ok"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There is something wrong that is not right :)'
        });
    }
}

exports.deleteTrack = async (req = request, res = response) => {
    const {id} = req.params;
    try {
        await findByIdAndDelete(id);
        res.status(200).json({msg: 'Delete track ok'});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There is something wrong that is not right :)'
        });
    }
}

exports.editTrack = async (req = request, res = response) => {
    const {userEmail, ...trackToUpdate} = req.body;
    const {id} = req.params;
    
    try {
        const updatedTrack = {
            ...(trackToUpdate.name && {name: trackToUpdate.name}),
            ...(trackToUpdate.album && {album: trackToUpdate.album}),
            ...(trackToUpdate.cover && {cover: trackToUpdate.cover}),
            ...(trackToUpdate.artist && {artist: trackToUpdate.artist})
        }

        await findByIdAndUpdate(id, updatedTrack);
        res.status(200).json({msg: 'Update track ok'});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There is something wrong that is not right :)'
        });
    }
}