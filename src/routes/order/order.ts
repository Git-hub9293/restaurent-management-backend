import express from "express";
import { AddOrder } from "../../controllers/order/addOrder";
import { ReadOrders } from "../../controllers/order/readOrders";
import { ChangeOrderStatus } from "../../controllers/order/changeStatusOrder";

const router = express.Router();

router.get(`/read-orders/:id`, ReadOrders);
router.post(`/add-order`, AddOrder);
router.patch(`/change-status`, ChangeOrderStatus);

export default router;
