const items = [
  {id: 1, name: 'Omena'},
  {id: 2, name: 'Appelsiini'},
  {id: 3, name: 'Porkkana'},
  {id: 4, name: 'Mandariini'},
];

const getItems = (req, res) => {
  res.json(items);
};

const getItemById = (req, res) => {
  console.log('getItemById', req.params.id);
  const item = items.find((item) => item.id == req.params.id);
  console.log('item found:', item);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

const addItem = (req, res) => {
  console.log('addItem request body', req.body);
  if (req.body.name) {
    const latestId = items[items.length - 1].id;
    const newItem = {id: latestId + 1, name: req.body.name};
    items.push(newItem);
    res.status(201);
    return res.json({message: 'Item added.'});
  }
  res.status(400);
  return res.json({message: 'Request is missing name property.'});
};

const editItem = (req, res) => {
  console.log('editItem request body', req.body);
  const item = items.find((item) => item.id == req.params.id);
  if (item) {
    item.name = req.body.name;
    res.json({message: 'Item updated.'});
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

const deleteItem = (req, res) => {
  console.log('deleteItem', req.params.id);
  const index = items.findIndex((item) => item.id == req.params.id);
  if (index !== -1) {
    items.splice(index, 1);
    res.json({message: 'Item deleted.'});
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

export {getItems, getItemById, addItem, editItem, deleteItem};
