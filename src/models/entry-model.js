import promisePool from '../utils/database.js';

const selectAllEntries = async () => {
  try {
    const [rows] = await promisePool.query(`SELECT * FROM DiaryEntries`);
    console.log('SelectAllEntries: ', rows);
    return rows;
  } catch (error) {
    console.log(error);
    throw new Error('Database error.');
  }
};

const selectEntryById = async (entryId) => {
  try {
    const [rows] = await promisePool.query(
      `SELECT * FROM DiaryEntries WHERE entry_id = ?`,
      [entryId],
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error('Database error.');
  }
};

const updateEntry = async (entryId, entry) => {
  try {
    const [result] = await promisePool.query(
      `
      UPDATE DiaryEntries SET mood = ?, weight = ?, sleep_hours = ?, notes = ?, WHERE entry_id = ?`,
      [entry.mood, entry.weight, entry.sleep, entry.notes, entryId],
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.log(error);
    throw new Error('Database error.');
  }
};

const deleteEntry = async (entryId) => {
  try {
    const [result] = await promisePool.query(
      `
         DELETE FROM DiaryEntries WHERE entry_id = ?`,
      [entryId],
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.log(error);
    throw new Error('Databse error.');
  }
};

export {selectAllEntries, selectEntryById, updateEntry, deleteEntry};
