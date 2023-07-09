const User = require('../models/user');

exports.save = async (user) => await User.save();