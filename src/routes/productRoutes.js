import express from "express";
import {
   getAllProducts,
   getProductById,
   addProduct,
   deleteProduct,
   updateProduct,
} from "../controller/dataController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
