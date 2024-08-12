import express from "express";
import {
  productCreateController,
  productFindController,
  productStatusChangeController,
  productUpdateController,
} from "../controller/ProductAddController.js";

const router = express.Router();

router.route("/createProduct").post(productCreateController);
router.route("/findProduct").get(productFindController);
router.route("/updateProduct").put(productUpdateController);
router.route("/statusChangeProduct").put(productStatusChangeController);

export default router;
