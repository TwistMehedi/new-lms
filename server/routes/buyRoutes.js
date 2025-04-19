import express from "express";
import { isLoggedIn } from "../middlewere/isLoggedIn.js";
import { purchaseCourse, stripeWebhook } from "../controller/buyController.js";

const router = express.Router();

router.route("/cheekout-session").post(isLoggedIn,purchaseCourse);
router.route("/webhook").post(express.raw({type:"application/json"}),stripeWebhook);
router.route("/course/:courseId/detail-with-status").get();
router.route("/").get();


export default router;