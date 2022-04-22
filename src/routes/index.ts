import { Router } from "express";
import otakuRouter from "./otakudesu";
import youtubeRouter from "./youtube";
import streamRoute from "./stream";
import kiryuuRoute from "./kiryuu";

const router = Router();

router.use("/otakudesu", otakuRouter);
router.use("/youtube", youtubeRouter);
router.use("/stream", streamRoute);
router.use("/kiryuu", kiryuuRoute);

export default router;
