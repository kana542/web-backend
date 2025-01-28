import users from '../users.js';

// kaikkien tunnusten tuonti
export const getAllUsers = (req, res) => {
  res.json(users);
};

// tunnuksen tuonti id:n perusteella
export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send(`User with id ${id} not found`);
  }
};

export const createUser = (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).send('Username, password, and email are required');
  }

  const newUser = {
    id: users.length + 1,
    username,
    password,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id !== id);
    res.status(200).send();
  } else {
    res.status(404).send(`User with id ${id} not found`);
  }
};
