import express from "express";
import { findAll } from '../../controllers/user.controller.js';
import { applyAsyncHandlerToRouter } from '../../utils/asyncHandler.js';
const router = express.Router();

router.get('/', findAll);

export default applyAsyncHandlerToRouter(router);