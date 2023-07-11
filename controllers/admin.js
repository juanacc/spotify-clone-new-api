const {response, request} = require('express');
const Tracks = require('../models/tracks');

exports.load = async (req=request, res=response) => {
    const tracks = req.body;
    Tracks.insertMany(tracks).then(res.status(201).send('Records were inserted successfully'));
}