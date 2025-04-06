import { Router }from 'express';
import { setAlert } from './alert.controller';
import { AlertValidator } from '../middlewares/utils/inputValidator';
import { Validator } from '../middlewares/utils/enums';

const router: Router = Router();

router.post('/', AlertValidator(Validator.CREATE_ALERT), setAlert);

export default router;
