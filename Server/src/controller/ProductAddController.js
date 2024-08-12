import asyncHandler from "express-async-handler";
import Products from "../database/Product.js";

// @desc    product create
// @route   post /api/product/createProduct
// @access  user

export const productCreateController = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const findProduct = await Products.findOne({
      name: name,
    });

    if (!findProduct) {
      const createProduct = await Products.create({
        name: name,
        price: price,
        descriptioin: description,
        category: category,
        status: true,
      });
      res
        .status(200)
        .json({ message: "Product added successfully", status: true });
    } else {
      res.status(400).json({ message: "Product already added", status: false });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});

// @desc    product find
// @route   post /api/product/findProduct
// @access  user

export const productFindController = asyncHandler(async (req, res) => {
  try {
    const findProduct = await Products.find({});
    res
      .status(200)
      .json({
        message: "Product find successfully",
        status: true,
        data: findProduct,
      });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});

// @desc    product update
// @route   post /api/product/updateProduct
// @access  user

export const productUpdateController = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, id } = req.body;

    const createProduct = await Products.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          price: price,
          description: description,
          category: category,
        },
      }
    );
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong" });
  }
});

// @desc    product StatusChange
// @route   post /api/product/statusChangeProduct
// @access  user

export const productStatusChangeController = asyncHandler(async (req, res) => {
  try {
    const { status, id } = req.body;

    const statusChange = await Products.updateOne(
      { _id: id },
      {
        $set: {
          status: status,
        },
      }
    );
    res.status(200).json({message:"Product statusChange successfully",status:true})
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong" });
  }
});
