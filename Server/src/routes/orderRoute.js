import express from "express";
import {
  orderFindController,
  orderStatusChangeController,
} from "../controller/orderManagmentController.js";

const router = express.Router();

router.route("/findOrder").get(orderFindController);
router.route("/statusChangeOrder").put(orderStatusChangeController);

export default router;
