import express from 'express';
import {
  getEntries,
  getEntryById,
  updateEntryById,
  deleteEntryById,
} from '../controllers/entry-controller.js';

const entryRouter = express.Router();

entryRouter.route('/').get(getEntries);

entryRouter
  .route('/:id')
  .get(getEntryById)
  .put(updateEntryById)
  .delete(deleteEntryById);

export default entryRouter;
