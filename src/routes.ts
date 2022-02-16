import { Router } from 'express';
import { authRouter } from './components/auth';
import { fileRouter } from './components/file';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Welcome to Risevest bruh!',
  });
});

router.use('/api/auth', authRouter);
router.use('/api/file', fileRouter);

export default router;
