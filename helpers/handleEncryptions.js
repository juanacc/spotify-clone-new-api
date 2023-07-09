const bcrypt = require('bcryptjs');

const encryptPassword = password => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const isPasswordCorrect = (password, passwordDB) => bcrypt.compareSync(password, passwordDB);

module.exports = {
    encryptPassword,
    isPasswordCorrect
}