import express from "express";
import {
    create,
    destroy,
    index,
    show,
    update,
    login,
} from "../../controllers/user.controller.js";
import { applyAsyncHandlerToRouter } from "../../utils/asyncHandler.js";
import authMiddleware from "../../middleware/auth.js"; // Import the middleware
const router = express.Router();

router.post("/login", login);

router.use(authMiddleware); // Add the middleware to the router

router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", destroy);

export default applyAsyncHandlerToRouter(router);
