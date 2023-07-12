const Tracks = require('../models/tracks');

exports.getAll = async (userEmail) => await Tracks.find({userEmail});
exports.findTrackById = async (uid) => await Tracks.findById(uid);
exports.saveTrack = async (track) => await track.save();
exports.findByIdAndUpdate = async (id, updatedTrack) => await Tracks.findByIdAndUpdate(id, updatedTrack);
exports.findByIdAndDelete = async (id) => await Tracks.findByIdAndDelete(id);