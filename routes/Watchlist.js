import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/AuthMiddleware.js";
import {
  addStockController,
  deleteStock,
  getAllStock,
} from "../controllers/WatchListController.js";

//router object
const router = express.Router();

//routing
//ADD
router.post("/addstock", addStockController);

//DELETE
router.delete("/delete/:symbol", requireSignIn, deleteStock);

//GETALL
router.get("/allstock/:userId", getAllStock);

export default router;
