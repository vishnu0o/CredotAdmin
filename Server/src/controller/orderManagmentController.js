import asyncHandler from "express-async-handler";
import orderSchema from "../database/orderSchema.js";

// @desc    orderFind
// @route   post /api/order/findOrder
// @access  user

export const orderFindController = asyncHandler(async (req, res) => {
  try {
    const findOrders = await orderSchema.find({});

    res.status(200).json({
      message: "orders find successfully",
      status: true,
      data: findOrders,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});

// @desc    orderStatusChange
// @route   post /api/order/statusChangeOrder
// @access  user

export const orderStatusChangeController = asyncHandler(async (req, res) => {
  try {
    const { status, id } = req.body;
    const orderStatusChange = await orderSchema.updateOne(
      { _id: id },
      {
        $set: {
          status: status,
        },
      }
    );

    res.status(200).json({
      message: "orders StatusChanged successfully",
      status: true,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});
