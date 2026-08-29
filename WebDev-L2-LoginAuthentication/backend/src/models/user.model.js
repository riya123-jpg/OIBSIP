function createUser({ username, email, hashPassword }) {
  return {
    id: Date.now().toString(),
    username,
    email,
    hashPassword,
  };
}
module.exports = {
  createUser,
};
