const User = require('../models/user');

exports.save = async (user) => await user.save();
exports.find = async (email) => await User.findOne({email});
exports.findById = async (uid) => await User.findById(uid)
exports.findByIdAndUpdate = async (id, user) => await User.findByIdAndUpdate(id, user);