import { Router } from "express";
import { registerController } from "./controllers/registerController";
import { getVoucherExpiration } from "./controllers/voucherController";
import { homeController } from "./controllers/homeController";
import { manifestController } from "./controllers/manifestController";

const router = Router();

router.get("/app", homeController);
router.get("/app/voucher", getVoucherExpiration);
router.get("/api/manifest", manifestController);
router.post("/api/register", registerController);

export default router;
