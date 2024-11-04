import express from "express";
import { productController } from "../controllers/ProductsController.js";

const router = express.Router();

//  get all products
router.get("/all", productController.getAllProducts);

// get random product
router.get("/random/:num", productController.getRandomeProducts);

//add product
router.post("/", productController.addProduct);

// get product by id
router.get("/:id", productController.getProductById, (req, res) => {
  res.json(res.product);
});

// update product
router.patch("/:id", productController.updateProduct);

// delete product
router.delete("/:id", productController.deleteProduct);

export default router;
