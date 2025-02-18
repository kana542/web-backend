import {
  selectAllEntries,
  selectEntryById,
  insertEntry,
  updateEntry,
  deleteEntry,
} from '../models/entry-model.js';

const getEntries = async (req, res) => {
  try {
    const entries = await selectAllEntries();
    res.json(entries);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getEntryById = async (req, res) => {
  try {
    const entry = await selectEntryById(req.params.id);
    if (entry) {
      res.json(entry);
    } else {
      res.status(404).json({message: 'Entry not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const postEntry = async (req, res) => {
  try {
    const {entry_date, mood, weight, sleep_hours, notes} = req.body;

    if (!entry_date) {
      return res.status(400).json({message: 'Entry date is required'});
    }

    const newEntry = {
      user_id: req.user.user_id,
      entry_date,
      mood,
      weight,
      sleep_hours,
      notes,
    };

    const result = await insertEntry(newEntry);
    res.status(201).json({
      message: 'Entry created successfully',
      entry_id: result,
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const updateEntryById = async (req, res) => {
  try {
    const result = await updateEntry(req.params.id, req.body);
    if (result) {
      res.json({message: 'Entry update OK'});
    } else {
      res.status(404).json({message: 'Entry not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const deleteEntryById = async (req, res) => {
  try {
    const result = await deleteEntry(req.params.id);
    if (result) {
      res.json({message: 'Entry delete OK'});
    } else {
      res.status(404).json({message: 'Entry not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export {getEntries, getEntryById, postEntry, updateEntryById, deleteEntryById};
