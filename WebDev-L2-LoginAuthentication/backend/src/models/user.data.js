//for read and write JSON file
const fs = require("fs").promises;

const path = require("path");

const usersFilePath = path.join(__dirname, "users.json");

async function getUsers() {
  const data = await fs.readFile(usersFilePath, "utf-8");

  return JSON.parse(data);
}

async function saveUsers(users) {
  const data = JSON.stringify(users, null, 2);
  await fs.writeFile(usersFilePath, data, "utf-8");
}

module.exports = {
  getUsers,
  saveUsers,
};
