import express from "express";
const router = express.Router();

import { submit_form } from "../controllers/contact.controller.js";

router.post("/submit_form", submit_form);

export default router;
