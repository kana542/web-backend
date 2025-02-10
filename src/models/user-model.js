import promisePool from '../utils/database.js';

const selectAllUsers = async () => {
  const [rows] = await promisePool.query(
    'SELECT user_id, username, email, created_at, user_level FROM Users',
  );
  console.log('selectAllUsers result', rows);
  return rows;
};

const selectUserById = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, created_at, user_level FROM Users WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const insertUser = async (user) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)',
      [user.username, user.password, user.email],
    );
    console.log('insertUser', result);
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectUserByNameAndPassword = async (username, password) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, created_at, user_level FROM Users WHERE username=? AND password=?',
      [username, password],
    );
    console.log(rows);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {
  selectAllUsers,
  selectUserById,
  insertUser,
  selectUserByNameAndPassword,
};
