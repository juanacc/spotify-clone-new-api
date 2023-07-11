const { Schema, model } = require('mongoose');

const TrackSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    album: {
        type: String,
        required: [true, 'Album is required'],
    },
    cover: {
        type: String,
        required: [true, 'Covre is required'],
    },
    artist: {
        type: String,
        required: [true, 'Artist is required']
    },
    durationStart: {
        type: Number,
        required: false,
        default: 0,
    },
    durationEnd: {
        type: Number,
        required: false,
        default: 333,
    },
    url: {
        type: String,
        required: false,
        default: ''
    },
    userEmail: {
        type: String,
        required: [true, 'UserEmail is required']
    }
});

TrackSchema.methods.toJSON = function() {
    const { __v, password, _id, ...object  } = this.toObject();
    object.uid = _id;
    return object;
}

module.exports = model( 'Track', TrackSchema );