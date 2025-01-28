import users from "../users.js";

export const getAllUsers = (req, res) => {
   res.json(users);
};

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
   const newUser = req.body;
   if (!newUser.username || !newUser.password || !newUser.email) {
      return res.status(400).send("Username, password and email required");
   }
   newUser.id = users.length + 1;
   users.push(newUser);
   res.status(201).json(newUser);
};

export const deleteUser = (req, res) => {
   const id = parseInt(req.params.id);
   const index = users.findIndex((user) => user.id === id);

   if (index === -1) {
      return res.status(404).send(`User with id ${id} not found`);
   }

   users.splice(index, 1);
   res.status(204).send();
};

export const updateUser = (req, res) => {
   const id = parseInt(req.params.id);
   const index = users.findIndex((user) => user.id === id);

   if (index === -1) {
      return res.status(404).send(`User with id ${id} not found`);
   }

   const updatedUser = req.body;
   if (!updatedUser.username || !updatedUser.password || !updatedUser.email) {
      return res.status(400).send("Username, password and email required");
   }

   users[index] = { ...users[index], ...updatedUser };
   res.json(users[index]);
};