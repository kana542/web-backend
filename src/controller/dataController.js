let exampleData = [
   { id: 1, product: "Apple", price: "1.00" },
   { id: 2, product: "Banana", price: "0.50" },
   { id: 3, product: "Cherry", price: "0.75" },
];

export const getAllProducts = (req, res) => {
   res.json(exampleData);
};

export const getProductById = (req, res) => {
   const id = parseInt(req.params.id);
   const product = exampleData.find((product) => product.id === id);

   if (product) {
      res.json(product);
   } else {
      res.status(404).send(`Product with id ${id} not found`);
   }
};

export const addProduct = (req, res) => {
   const newProduct = req.body;
   if (!newProduct.product || !newProduct.price) {
      return res.status(400).send("Product and price required");
   }
   newProduct.id = exampleData.length + 1;
   exampleData.push(newProduct);
   res.status(201).json(newProduct);
};

export const deleteProduct = (req, res) => {
   const id = parseInt(req.params.id);
   const index = exampleData.findIndex((product) => product.id === id);

   if (index === -1) {
      return res.status(404).send(`Product with id ${id} not found`);
   }

   exampleData.splice(index, 1);
   res.status(204).json({ message: "Product deleted" });
};

export const updateProduct = (req, res) => {
   const id = parseInt(req.params.id);
   const index = exampleData.findIndex((product) => product.id === id);

   if (index === -1) {
      return res.status(404).send(`Product with id ${id} not found`);
   }

   const updatedProduct = req.body;
   if (!updatedProduct.name || !updatedProduct.price) {
      return res.status(400).send("Product and price required");
   }

   exampleData[index] = { ...exampleData[index], ...updatedProduct };
   res.json(exampleData[index]);
};
