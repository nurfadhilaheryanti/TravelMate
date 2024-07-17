const bcrypt = require("bcryptjs");

const hash = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
};

const compare = (pass, hashedPass) => {
 return bcrypt.compare(pass, hashedPass)
}

module.exports = {hash, compare}
