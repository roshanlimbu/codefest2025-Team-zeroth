import express from 'express';
import { requireAuth, AuthedRequest } from '../middleware/auth.js';
import { userFuncObj} from '../controllers/UserController.js';
const router = express.Router();

router.get('/users', requireAuth, userFuncObj.getAllusers);


export default router;
