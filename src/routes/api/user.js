import express from "express";
import { create, destroy, index, show, update } from '../../controllers/user.controller.js';
import { applyAsyncHandlerToRouter } from '../../utils/asyncHandler.js';
const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', destroy);

export default applyAsyncHandlerToRouter(router);