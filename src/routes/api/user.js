import express from "express";
import { findAll } from '../../controllers/user.controller.js';
import asyncHandler from '../../utils/asyncHandler.js';
const router = express.Router();

router.get('/', findAll);

// Apply async handler to all routes
function applyAsyncHandler(router) {
    for (let layer of router.stack) {
        if (layer.route) {
            layer.route.stack[0].handle = asyncHandler(layer.route.stack[0].handle);
        }
    }
    return router;
}

export default applyAsyncHandler(router);