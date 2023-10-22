import CatchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js"; 


// Create new Product => /api/v1/products
export const getProducts = CatchAsyncErrors(async (req, res) => {
  const apiFilters = new APIFilters(Product , req.query).search();
  let products = await apiFilters.query;

  let filteredProductsCount = products.length
 
  res.status(200).json({
    filteredProductsCount,
    products,
  });
});

// Create new Product => /api/v1/admin/products
export const newProduct = CatchAsyncErrors(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    product,
  });
});

// Get single Product => /api/v1/products/:id
export const getProductDetails = CatchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    product,
  });
});

// update Product details => /api/v1/products/:id
export const updateProductDetails = CatchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });
  res.status(200).json({
    product,
  });
});

// delete Product => /api/v1/products/:id
export const deleteProduct = CatchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  await Product.deleteOne();

  res.status(200).json({
    message: "Product Delete",
  });
});
