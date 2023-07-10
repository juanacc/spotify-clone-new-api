
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    avatar: {
        type: String,
        require: false,
        default: 'https://i.imgur.com/0mZ4PUR.png'
    },
    role: {
        type: String,
        require: [true, 'Role is required'],
        default: 'user'
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...object  } = this.toObject();
    object.uid = _id;
    return object;
}

module.exports = model( 'User', UserSchema );