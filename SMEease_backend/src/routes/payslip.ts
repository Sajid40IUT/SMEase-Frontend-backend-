import express from 'express';
import { getAllPayslips, getPayslipById, createPayslip, updatePayslip, deletePayslip } from '../controllers/payslipController';

const router = express.Router();

router.get('/', getAllPayslips);
router.get('/:id', getPayslipById);
router.post('/', createPayslip);
router.put('/:id', updatePayslip);
router.delete('/:id', deletePayslip);

export default router;
