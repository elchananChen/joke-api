import Product from "../models/productsModel.js";

//  get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

// get random products  by num of products
const getRandomeProducts = async (req, res) => {
  try {
    let num = req.params.num || 1;

    if (isNaN(num) || num < 1) {
      num = 1;
    }

    const randomProducts = await Product.aggregate([
      { $sample: { size: parseInt(num) } },
    ]);

    res.send(randomProducts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

// get product by id
async function getProductById(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product === null) {
      return res.status(404).json({ massege: "id not found" });
    }
    res.send({ product });
  } catch (error) {
    return res.status(500).json({ massege: error.massege });
  }
  res.product = product;
  next();
}

//add product
const addProduct = async (req, res) => {
  try {
    const toAdd = {
      name: req.body.name,
      price: req.body.price,
    };

    //  chack if inStoke provaided , if provaid add to "toAdd"
    req.body.inStock !== undefined && (toAdd.inStock = req.body.inStock);

    const newProduct = new Product(toAdd);
    const savedProduct = await newProduct.save();

    const id = savedProduct._id;
    res.send({
      message: "seve this id to delete or update your product latter on",
      id,
    });
  } catch (error) {
    // check if it mongoose error ( ValidationError - json name thet raturn from mongoose)
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "Validation error occurred.",
        error: error.message,
      });
    } else if (error.code === 11000) {
      return res.status(409).send({
        message: "Duplicate key error. The product already exists.",
        error: error.message,
      });
    } else {
      console.error(error);
      return res.status(500).send({
        message: "An error occurred while adding the product.",
        error: error.message,
      });
    }
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, inStock } = req.body;
    const filedsToUpdate = {};

    if (name && name !== "") {
      filedsToUpdate.name = name;
    }

    if (price && price !== "") {
      filedsToUpdate.price = price;
    }

    if (inStock === true && inStock === false) {
      filedsToUpdate.inStock = inStock;
    }

    await Product.findByIdAndUpdate(id, filedsToUpdate, {
      runValidators: true,
    });

    res.send({ message: "updated successfully" });
  } catch (err) {
    res.send({ error: `${err}` });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.send({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const productController = {
  getAllProducts,
  addProduct,
  getRandomeProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
