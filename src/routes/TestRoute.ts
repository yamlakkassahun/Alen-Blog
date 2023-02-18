import express, { Request, Response, NextFunction } from 'express';
import { getAll } from '../controllers';

const router = express.Router();

router.get('/', getAll);

export { router as TestRouter };