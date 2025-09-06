import express from 'express';
import { getAllPayrollPeriods, getPayrollPeriodById, createPayrollPeriod, updatePayrollPeriod, deletePayrollPeriod } from '../controllers/payrollPeriodController';

const router = express.Router();

router.get('/', getAllPayrollPeriods);
router.get('/:id', getPayrollPeriodById);
router.post('/', createPayrollPeriod);
router.put('/:id', updatePayrollPeriod);
router.delete('/:id', deletePayrollPeriod);

export default router;
